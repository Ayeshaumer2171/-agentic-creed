"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface Ticket {
  id: string;
  subject: string;
  priority: string;
  due: string;
  status: string;
  initials: string;
}

type StatusType = "Open" | "Resolved" | "Pending" | "Closed";

const ticketsData: Record<StatusType, Ticket[]> = {
  Open: [
    {
      id: "#INC68",
      subject: "Test Subject",
      priority: "High",
      due: "Was Due Till 01/30/2025",
      status: "New",
      initials: "JO",
    },
  ],
  Resolved: [],
  Pending: [
    {
      id: "#SR745",
      subject: "Request For: Treter",
      priority: "High",
      due: "Not Planned",
      status: "New",
      initials: "MT",
    },
    {
      id: "#INC664",
      subject: "TEST",
      priority: "High",
      due: "Was Due Till 02/20/2025",
      status: "New",
      initials: "AN",
    },
  ],
  Closed: [
    {
      id: "#SR635",
      subject: "Request For: Test Subject",
      priority: "High",
      due: "Closed: Just now",
      status: "New",
      initials: "FA",
    },
  ],
};

// Colors for headers
const statusColors: Record<StatusType, string> = {
  Open: "#00bcd4",
  Resolved: "#fbc02d",
  Pending: "#ef5350",
  Closed: "#4caf50",
};

export default function TicketsBoard() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        flexWrap: "wrap",
        bgcolor: "#ffffff",
      }}
    >
      {(Object.keys(ticketsData) as StatusType[]).map((status) => (
        <Box
          key={status}
          sx={{
            flex: "1 1 300px",
            bgcolor: "#f3f4f6",
            borderRadius: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 420,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              borderBottom: `3px solid ${statusColors[status]}`,
              pb: 1,
            }}
          >
            <Chip
              label={
                <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                  {status === "Open"
                    ? "01"
                    : status === "Resolved"
                    ? "00"
                    : status === "Pending"
                    ? "02"
                    : "01"}
                </Typography>
              }
              sx={{
                mr: 1,
                backgroundColor: statusColors[status],
                color: "white",
              }}
              size="small"
            />
            <Typography sx={{ fontWeight: 600, color: statusColors[status] }}>
              {status}
            </Typography>
          </Box>

          {/* Ticket Cards */}
          {ticketsData[status].length === 0 ? (
            <Typography
              sx={{
                color: "gray",
                mt: 2,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              No Tickets
            </Typography>
          ) : (
            <Grid container direction="column" gap={2}>
              {ticketsData[status].map((ticket) => (
                <Card
                  key={ticket.id}
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                    bgcolor: "white",
                  }}
                >
                  <CardContent>
                    {/* Header Row */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ color: "#1976d2", fontWeight: 600 }}>
                        {ticket.id}
                      </Typography>

                      {/* “New” status chip */}
                      <Chip
                        label={ticket.status}
                        size="small"
                        sx={{
                          bgcolor: "#e8f5e9",
                          color: "#43a047",
                          fontWeight: 500,
                          borderRadius: "8px",
                          px: 1,
                          fontSize: 12,
                        }}
                      />
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Subject */}
                    <Typography sx={{ fontWeight: 500, mb: 1 }}>
                      {ticket.subject}
                    </Typography>

                    {/* Footer Info */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PriorityHighIcon sx={{ color: "red", fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13 }}>
                          {ticket.priority}
                        </Typography>
                        <AccessTimeIcon
                          sx={{ color: "#fbc02d", fontSize: 18, ml: 1 }}
                        />
                        <Typography sx={{ fontSize: 13 }}>
                          {ticket.due}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: "#00bfa5",
                          width: 28,
                          height: 28,
                          fontSize: 13,
                        }}
                      >
                        {ticket.initials}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          )}
        </Box>
      ))}
    </Box>
  );
}
