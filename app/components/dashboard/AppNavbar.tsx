"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Paper,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Call,
  Chat,
  Event,
  Description,
  Mail,
  Business,
  Group,
  MoreVert,
  Link,
  Notifications,
  ArrowDropDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";



export default function AppNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [linkEl, setLinkEl] = useState<null | HTMLElement>(null);
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (set: any) => (e: React.MouseEvent<HTMLElement>) => set(e.currentTarget);
  const handleClose = (set: any) => () => set(null);

  const iconStyle = { color: "#6b7280", fontSize: 22 };

  const actionIcons = [
    { icon: Call, label: "Call" },
    { icon: Chat, label: "Chat" },
    { icon: Event, label: "Meeting" },
    { icon: Description, label: "Documents" },
    { icon: Mail, label: "Email" },
    { icon: Business, label: "Companies" },
    { icon: Group, label: "Contacts" },
  ];


  const router = useRouter();


  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: "1px solid #f0f0f0" }}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 3 }, py: 1.5 }}>
        {/* ---- Left Search ---- */}
        <Paper
          elevation={0}
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          }}
        >
          <IconButton size="small">
            <Search sx={{ color: "#374151" }} />
          </IconButton>
        </Paper>

        {/* ---- Right Section ---- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Desktop Icons */}
          {!isMobile && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderColor: "#e5e7eb",
              }}
            >
              {actionIcons.map(({ icon: Icon, label }, i) => (
                <Tooltip title={label} arrow key={i}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (label === "Chat") router.push("/social-components/chat");
                    }}
                  >
                    <Icon sx={iconStyle} />
                  </IconButton>
                </Tooltip>
              ))}

            </Paper>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <>
              <Tooltip title="Menu" arrow>
                <IconButton onClick={handleOpen(setMobileMenu)}>
                  <MenuIcon sx={iconStyle} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={mobileMenu}
                open={Boolean(mobileMenu)}
                onClose={handleClose(setMobileMenu)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                {actionIcons.map(({ label }) => (
                  <MenuItem key={label}>{label}</MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Links & Notification */}
          <Tooltip title="Links" arrow>
            <IconButton onClick={handleOpen(setLinkEl)}>
              <Link sx={iconStyle} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={linkEl}
            open={Boolean(linkEl)}
            onClose={handleClose(setLinkEl)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MenuItem>Linked Accounts</MenuItem>
            <MenuItem>Integrations</MenuItem>
          </Menu>

          <Tooltip title="Notifications" arrow>
            <IconButton>
              <Badge badgeContent={28} color="error">
                <Notifications sx={{ color: "#facc15", fontSize: 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>FE</Typography>
            <Tooltip title="Profile Menu" arrow>
              <IconButton onClick={handleOpen(setProfileEl)} size="small">
                <ArrowDropDown sx={{ color: "#374151" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={profileEl}
            open={Boolean(profileEl)}
            onClose={handleClose(setProfileEl)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography sx={{ fontWeight: 600 }}>Frontend Evening</Typography>
              <Typography sx={{ fontSize: 12, color: "gray" }}>Frontend Software</Typography>
            </Box>
            <Divider />
            <MenuItem>Edit Profile</MenuItem>
            <MenuItem>Change Password</MenuItem>
            <MenuItem>Activity Logs</MenuItem>
            <MenuItem>Delegate</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
