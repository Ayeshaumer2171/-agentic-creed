"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import HighlightedCard from "@/app/components/dashboard/HighlightedCard";
import CustomizedDataGrid from "@/app/components/dashboard/CustomizedDataGrid";

export default function CompanyDashboardPage() {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          fontSize: { xs: 20, sm: 24, md: 28 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Dashboard Overview
      </Typography>

      <Box sx={{ mt: 3 }}>
        <HighlightedCard />
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <CustomizedDataGrid />
        </Box>
      </Box>
    </Box>
  );
}
