"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function FeedbackPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Feedback Survey
      </Typography>
      <Typography sx={{ mt: 2, color: "gray" }}>
        View and analyze customer feedback responses.
      </Typography>
    </Box>
  );
}
