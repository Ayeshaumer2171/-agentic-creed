"use client";

import React from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  CloudUploadOutlined,
  AddCircleOutline,
  RefreshOutlined,
  TuneOutlined,
  FilterListOutlined,
  ViewListOutlined,
  ViewKanbanOutlined,
  Search,
} from "@mui/icons-material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";

export default function TicketsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const viewType = searchParams.get("viewType") || "list";

  const handleToggleView = (type: "list" | "board") => {
    router.push(`${pathname}?viewType=${type}`);
  };

  return (
    <Box sx={{ bgcolor: "#fff", p: { xs: 1.5, sm: 2 } }}>
      {/* ----------- Top Row: Title + Export/Create ----------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
          gap: 1.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1f2937",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          Ticket List – All Tickets
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          {!isMobile && (
            <Tooltip title="Export Tickets">
              <Button
                variant="outlined"
                startIcon={<CloudUploadOutlined />}
                sx={{
                  textTransform: "none",
                  color: "#374151",
                  borderColor: "#d1d5db",
                  fontWeight: 500,
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#9ca3af" },
                }}
              >
                Export
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Create a new ticket">
            <Button
              variant="contained"
              fullWidth={isMobile}
              startIcon={<AddCircleOutline />}
              sx={{
                textTransform: "none",
                bgcolor: "#10b981",
                "&:hover": { bgcolor: "#0d9488" },
                fontWeight: 500,
                borderRadius: "8px",
                px: { xs: 2, sm: 3 },
              }}
            >
              Create Ticket
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* ----------- Second Row: Search + Controls ----------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search Here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#6b7280" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: 260 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "#f9fafb",
              "& fieldset": { borderColor: "#e5e7eb" },
              "&:hover fieldset": { borderColor: "#9ca3af" },
            },
          }}
        />

        {/* Action Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: { xs: "space-between", md: "flex-end" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          {/* Hide these when Board view is active */}
          {viewType === "list" && !isMobile && (
            <>
              <Select
                value=""
                displayEmpty
                disabled
                sx={{
                  minWidth: 110,
                  height: 36,
                  borderRadius: "8px",
                  bgcolor: "#f9fafb",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "& .MuiSelect-select": {
                    color: "#9ca3af",
                  },
                }}
              >
                <MenuItem disabled>Actions</MenuItem>
              </Select>

              <Tooltip title="Reload Tickets">
                <IconButton
                  sx={{
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "#f3f4f6" },
                  }}
                >
                  <RefreshOutlined sx={{ color: "#374151" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Customize View">
                <Button
                  variant="outlined"
                  startIcon={<TuneOutlined />}
                  sx={{
                    textTransform: "none",
                    color: "#374151",
                    borderColor: "#d1d5db",
                    borderRadius: "8px",
                    "&:hover": { borderColor: "#9ca3af" },
                  }}
                >
                  Customize
                </Button>
              </Tooltip>
            </>
          )}

          {/* Filter always visible */}
          {!isMobile && (
            <Tooltip title="Filter Tickets">
              <Button
                variant="outlined"
                startIcon={<FilterListOutlined />}
                sx={{
                  textTransform: "none",
                  color: "#374151",
                  borderColor: "#d1d5db",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#9ca3af" },
                }}
              >
                Filter
              </Button>
            </Tooltip>
          )}

          {/* View Toggle */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              ml: { xs: 0, sm: 1 },
              width: "fit-content",
            }}
          >
            <Tooltip title="List View">
              <IconButton
                onClick={() => handleToggleView("list")}
                sx={{
                  bgcolor: viewType === "list" ? "#e5e7eb" : "#fff",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                <ViewListOutlined sx={{ color: "#374151" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Board View">
              <IconButton
                onClick={() => handleToggleView("board")}
                sx={{
                  bgcolor: viewType === "board" ? "#e5e7eb" : "#fff",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <ViewKanbanOutlined sx={{ color: "#374151" }} />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
