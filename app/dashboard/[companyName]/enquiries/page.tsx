"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function EnquiriesPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Enquiries
      </Typography>
      <Typography sx={{ mt: 2, color: "gray" }}>
        Manage customer enquiries and contact forms here.
      </Typography>
    </Box>
  );
}
