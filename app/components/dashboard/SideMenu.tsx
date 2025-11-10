"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  ConfirmationNumber,
  Layers,
  LibraryBooks,
  HeadsetMic,
  Assessment,
  QuestionAnswer,
  VpnKey,
  AccountCircle,
  Settings,
  ExitToApp,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function SideMenu() {
  const [assetsOpen, setAssetsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { companyName } = useParams();
  const pathname = usePathname();

  const router = useRouter();


  const displayName = companyName
    ? (companyName as string).replace(/-/g, " ")
    : "Company Name";

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard />, path: `/dashboard/${companyName}` },
    { label: "Tickets", icon: <ConfirmationNumber />, path: `/dashboard/${companyName}/tickets` },
    { label: "Assets", icon: <Layers />, path: `/dashboard/${companyName}/assets` },
    { label: "Knowledge Base", icon: <LibraryBooks />, path: `/dashboard/${companyName}/knowledge` },
    { label: "WorkLoad", icon: <HeadsetMic />, path: `/dashboard/${companyName}/workload` },
    { label: "Feedback Survey", icon: <QuestionAnswer />, path: `/dashboard/${companyName}/feedback` },
    { label: "Reports", icon: <Assessment />, path: `/dashboard/${companyName}/reports` },
    { label: "Enquiries", icon: <AccountCircle />, path: `/dashboard/${companyName}/enquiries` },
    { label: "Signup Leads", icon: <VpnKey />, path: `/dashboard/${companyName}/leads` },
    { label: "Customer Portal", icon: <AccountCircle />, path: `/dashboard/${companyName}/portal` },
  ];

  const activeColor = "#000";
  const inactiveColor = "gray";
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#fff",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": { bgcolor: "#d1d5db", borderRadius: "3px" },
      }}
    >
      {/* ---- TOP SECTION ---- */}
      <Box>
        <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
          <Image
            src="/logoagent.svg"
            alt="Agentic Creed"
            width={140}
            height={70}
            style={{ marginBottom: 4, maxWidth: "100%", height: "auto" }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "#239c9c",
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              wordBreak: "break-word",
            }}
          >
            {displayName}
          </Typography>
        </Box>

        {/* ---- MENU ---- */}
        <List dense>
          {menuItems.map((item) => {
            if (item.label === "Assets") {
              return (
                <React.Fragment key="Assets">
                  <ListItemButton onClick={() => setAssetsOpen(!assetsOpen)}>
                    <ListItemIcon sx={{ color: inactiveColor }}>
                      <Layers />
                    </ListItemIcon>
                    <ListItemText primary="Assets" sx={{ color: inactiveColor }} />
                    {assetsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={assetsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 8, color: inactiveColor }}
                        component={Link}
                        href={`/dashboard/${companyName}/assets/asset1`}
                      >
                        <ListItemText primary="Asset 1" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 8, color: inactiveColor }}
                        component={Link}
                        href={`/dashboard/${companyName}/assets/asset2`}
                      >
                        <ListItemText primary="Asset 2" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }

            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.path}
                sx={{
                  color: active ? activeColor : inactiveColor,
                  "&:hover": { color: activeColor, bgcolor: "#f5f5f5" },
                }}
              >
                <ListItemIcon sx={{ color: active ? activeColor : inactiveColor }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* ---- SETTINGS + LOGOUT ---- */}
      <Box>
        <Divider />
        <List dense>
          <ListItemButton onClick={() => setSettingsOpen(!settingsOpen)}>
            <ListItemIcon sx={{ color: inactiveColor }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: inactiveColor }} />
            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8, color: inactiveColor }}>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8, color: inactiveColor }}>
                <ListItemText primary="Preferences" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton sx={{ color: inactiveColor }}>
            <ListItemIcon sx={{ color: inactiveColor }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" 
             onClick={() => {
              sessionStorage.removeItem("token");
              router.push("/"); 
            }} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}
