"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function WorkloadPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Workload
      </Typography>
      <Typography sx={{ mt: 2, color: "gray" }}>
        Track your team’s active workload and tasks.
      </Typography>
    </Box>
  );
}
