const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Store connected users and messages
const connectedUsers = new Map(); // socketId -> { userId, userName, socketId }
const messages = new Map(); // "userId1:userId2" -> [{ from, to, message, timestamp }]
const demoUsers = [
  { id: 'demo1', name: 'John Doe', email: 'john@example.com' },
  { id: 'demo2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'demo3', name: 'Bob Johnson', email: 'bob@example.com' }
];

// Helper function to get conversation key (sorted to ensure consistency)
function getConversationKey(userId1, userId2) {
  return [userId1, userId2].sort().join(':');
}

// Get all users (demo + connected real users)
app.get('/api/users', (req, res) => {
  const allUsers = [
    ...demoUsers,
    ...Array.from(connectedUsers.values()).map(user => ({
      id: user.userId,
      name: user.userName,
      email: user.email || `${user.userName}@example.com`
    }))
  ];
  res.json(allUsers);
});

// Get messages between two users
app.get('/api/messages/:userId1/:userId2', (req, res) => {
  const { userId1, userId2 } = req.params;
  const key = getConversationKey(userId1, userId2);
  const conversationMessages = messages.get(key) || [];
  res.json(conversationMessages);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins the chat
  socket.on('user:join', (userData) => {
    const { userId, userName, email } = userData;
    
    // Store user connection
    connectedUsers.set(socket.id, {
      userId: userId || socket.id,
      userName: userName || 'Anonymous',
      email: email || '',
      socketId: socket.id
    });

    // Notify all users about the new user
    const allUsers = [
      ...demoUsers,
      ...Array.from(connectedUsers.values()).map(user => ({
        id: user.userId,
        name: user.userName,
        email: user.email || `${user.userName}@example.com`,
        online: true
      }))
    ];
    
    io.emit('users:updated', allUsers);
    console.log(`User ${userName} (${userId}) joined`);
  });

  // Send private message
  socket.on('message:send', (messageData) => {
    const { to, from, message } = messageData;
    const fromUser = connectedUsers.get(socket.id);
    
    // Use from parameter if provided, otherwise use fromUser
    const senderId = from || (fromUser ? fromUser.userId : null);
    const senderName = fromUser ? fromUser.userName : 'Unknown User';
    
    if (!senderId) {
      console.error('Message send failed: No sender ID');
      socket.emit('error', { message: 'User not authenticated' });
      return;
    }

    if (!to || !message) {
      console.error('Message send failed: Missing to or message');
      socket.emit('error', { message: 'Missing recipient or message' });
      return;
    }

    const timestamp = new Date().toISOString();
    const conversationKey = getConversationKey(senderId, to);
    
    // Store message
    if (!messages.has(conversationKey)) {
      messages.set(conversationKey, []);
    }
    
    const messageObj = {
      from: senderId,
      to,
      message,
      timestamp,
      userName: senderName
    };
    
    messages.get(conversationKey).push(messageObj);
    console.log(`Message stored: ${senderId} -> ${to}: ${message.substring(0, 50)}`);

    // Find recipient socket
    let recipientSocket = null;
    for (const [socketId, user] of connectedUsers.entries()) {
      if (user.userId === to) {
        recipientSocket = socketId;
        break;
      }
    }

    // Send to recipient if online
    if (recipientSocket) {
      io.to(recipientSocket).emit('message:receive', messageObj);
      console.log(`Message sent to recipient: ${to}`);
    } else {
      console.log(`Recipient ${to} is not online, message stored for later`);
    }

    // Always send confirmation to sender so they can see their message
    socket.emit('message:sent', messageObj);
    console.log(`Message confirmation sent to sender: ${senderId}`);
  });

  // Add new user manually
  socket.on('user:add', (userData) => {
    const { name, email } = userData;
    const newUserId = `user_${Date.now()}`;
    
    // Add to demo users (or create a separate list for added users)
    demoUsers.push({
      id: newUserId,
      name: name || 'New User',
      email: email || `${newUserId}@example.com`
    });

    const allUsers = [
      ...demoUsers,
      ...Array.from(connectedUsers.values()).map(user => ({
        id: user.userId,
        name: user.userName,
        email: user.email || `${user.userName}@example.com`,
        online: true
      }))
    ];
    
    io.emit('users:updated', allUsers);
  });

  // Get conversation history
  socket.on('messages:get', (data) => {
    const { userId1, userId2 } = data;
    const conversationKey = getConversationKey(userId1, userId2);
    const conversationMessages = messages.get(conversationKey) || [];
    socket.emit('messages:history', conversationMessages);
  });

  // User disconnects
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`User ${user.userName} (${user.userId}) disconnected`);
      connectedUsers.delete(socket.id);
      
      // Notify all users
      const allUsers = [
        ...demoUsers,
        ...Array.from(connectedUsers.values()).map(user => ({
          id: user.userId,
          name: user.userName,
          email: user.email || `${user.userName}@example.com`,
          online: true
        }))
      ];
      
      io.emit('users:updated', allUsers);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

