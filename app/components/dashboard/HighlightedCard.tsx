"use client";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function HighlightedCard() {
  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Quick Tip</Typography>
        <Typography color="text.secondary">Monitor conversion rates weekly to spot drops quickly.</Typography>
      </CardContent>
    </Card>
  );
}
