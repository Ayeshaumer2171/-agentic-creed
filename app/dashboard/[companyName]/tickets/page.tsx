"use client";

import React from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import TicketsHeader from "./components/TicketsHeader";
import TicketsTable from "./components/TicketsTable";
import TicketsBoard from "./components/TicketsBoard";

export default function TicketsPage() {
  const searchParams = useSearchParams();
  const viewType = searchParams.get("viewType") || "list";

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        bgcolor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowX: "hidden",
      }}
    >
      <TicketsHeader />

      <Box
        sx={{
          width: "100%",
          overflowX: "auto", 
        }}
      >
        {viewType === "list" ? <TicketsTable /> : <TicketsBoard />}
      </Box>
    </Box>
  );
}
