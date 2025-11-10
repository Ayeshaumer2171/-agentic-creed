"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Reports
      </Typography>
      <Typography sx={{ mt: 2, color: "gray" }}>
        Access analytics and performance reports here.
      </Typography>
    </Box>
  );
}
