"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function KnowledgePage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        Knowledge Base
      </Typography>
      <Typography sx={{ mt: 2, color: "gray" }}>
        Browse useful guides and documentation.
      </Typography>
    </Box>
  );
}
