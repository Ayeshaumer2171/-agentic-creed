"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { RootState } from '@/app/store';

interface User {
  id: string;
  name: string;
  email: string;
  online?: boolean;
}

interface Message {
  from: string;
  to: string;
  message: string;
  timestamp: string;
  userName?: string;
}

export default function ChatPage() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserIdRef = useRef<string>('');
  const currentUserNameRef = useRef<string>('Current User');
  const currentUserEmailRef = useRef<string>('current@example.com');

  useEffect(() => {
    if (authUser?.id || authUser?.userId) {
      if (!currentUserIdRef.current) {
        currentUserIdRef.current = authUser.id || authUser.userId || `user_${Date.now()}`;
      }
      currentUserNameRef.current = authUser.name || authUser.userName || authUser.username || 'Current User';
      currentUserEmailRef.current = authUser.email || 'current@example.com';
    } else if (!currentUserIdRef.current) {
      currentUserIdRef.current = `user_${Date.now()}`;
    }
  }, [authUser]);

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    const userId = currentUserIdRef.current;
    return allMessages
      .filter(
        (msg) =>
          (msg.from === userId && msg.to === selectedUser.id) ||
          (msg.to === userId && msg.from === selectedUser.id)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [allMessages, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('users:updated', (usersList: User[]) => setUsers(usersList));
    newSocket.on('message:receive', (message: Message) => {
      setAllMessages((prev) => [...prev, message]);
    });
    newSocket.on('message:sent', (message: Message) => {
      setAllMessages((prev) => [...prev, message]);
    });

    const handleConnect = () => {
      newSocket.emit('user:join', {
        userId: currentUserIdRef.current,
        userName: currentUserNameRef.current,
        email: currentUserEmailRef.current,
      });
    };
    newSocket.on('connect', handleConnect);

    if (newSocket.connected) handleConnect();

    fetch('http://localhost:3001/api/users')
      .then((res) => res.json())
      .then((usersList: User[]) => setUsers(usersList))
      .catch((err) => console.error('Error fetching users:', err));

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (selectedUser && socket) {
      const userId = currentUserIdRef.current;

      socket.once('messages:history', (history: Message[]) => {
        setAllMessages((prev) => [...prev, ...history]);
      });

      socket.emit('messages:get', {
        userId1: userId,
        userId2: selectedUser.id,
      });

      fetch(`http://localhost:3001/api/messages/${userId}/${selectedUser.id}`)
        .then((res) => res.json())
        .then((history: Message[]) => setAllMessages((prev) => [...prev, ...history]))
        .catch((err) => console.error('Error fetching messages:', err));
    }
  }, [selectedUser?.id, socket]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser || !socket) return;

    socket.emit('message:send', {
      from: currentUserIdRef.current,
      to: selectedUser.id,
      message: messageInput.trim(),
    });

    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0 }}>
        {/* Users List */}
        <Paper sx={{ width: 300, display: 'flex', flexDirection: 'column', p: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Users</Typography>
            <IconButton size="small" color="primary">
              <PersonAddIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List sx={{ flex: 1, overflow: 'auto' }}>
            {users
              .filter((user) => user.id !== currentUserIdRef.current)
              .map((user) => (
                <ListItem key={user.id} disablePadding>
                  <ListItemButton
                    selected={selectedUser?.id === user.id}
                    onClick={() => setSelectedUser(user)}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    {user.online && (
                      <Chip label="Online" color="success" size="small" sx={{ ml: 1 }} />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {selectedUser ? (
            <>
              <Box sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  mb: 2,
                  p: 1,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                {messages.map((msg, index) => {
                  const isOwnMessage = msg.from === currentUserIdRef.current;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 1.5,
                          maxWidth: '70%',
                          bgcolor: isOwnMessage ? 'primary.main' : 'white',
                          color: isOwnMessage ? 'white' : 'text.primary',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {isOwnMessage ? 'You' : msg.userName || selectedUser.name}
                        </Typography>
                        <Typography variant="body1">{msg.message}</Typography>
                        <Typography
                          variant="caption"
                          sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Box>
                  );
                })}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSendMessage}
                          disabled={!messageInput.trim()}
                          color="primary"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a user to start chatting
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
