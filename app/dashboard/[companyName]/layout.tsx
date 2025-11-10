"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import SideMenu from "@/app/components/dashboard/SideMenu";
import AppNavbar from "@/app/components/dashboard/AppNavbar";

const drawerWidth = 250;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh",}}>
      <CssBaseline />

      {/* ---- MOBILE DRAWER ---- */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: "#ffffff",
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <SideMenu />
        </Drawer>
      )}

      {/* ---- DESKTOP SIDEBAR ---- */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: "#ffffff",
              borderRight: "1px solid #e0e0e0",
              boxSizing: "border-box",
            },
          }}
        >
          <SideMenu />
        </Drawer>
      )}

      {/* ---- MAIN CONTENT ---- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* ---- TOP NAVBAR ---- */}
        <AppNavbar />

        {/* ---- MOBILE MENU BUTTON ---- */}
        {isMobile && (
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1301,
              bgcolor: "#fff",
              boxShadow: 1,
              "&:hover": { bgcolor: "#f3f4f6" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* ---- PAGE CONTENT ---- */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            pt: { xs: 10, md: 4 }, // spacing below navbar
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
