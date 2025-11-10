"use client";

import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Checkbox,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetTicketsQuery } from "@/app/services/ticketsApi";

export default function TicketsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, error, isLoading } = useGetTicketsQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  if (typeof window !== "undefined") {
    console.debug("tickets payload:", data);
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };



  const tickets = (data as any)?.data?.tickets ?? (data as any)?.tickets ?? (data as any)?.data ?? [];
  const total = (data as any)?.data?.meta?.total ?? (data as any)?.meta?.total ?? tickets.length ?? 0;

  return (
    <Box sx={{ mt: 2, overflowX: "auto", p: 2, borderRadius: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          minWidth: isMobile ? 700 : "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f9fafb" }}>
              <TableCell padding="checkbox">
                <Checkbox sx={{ color: "#9ca3af" }} />
              </TableCell>
              {[
                "Ticket ID",
                "Subject",
                "Requester",
                "Assigned to",
                "State",
                "Status",
                "Priority",
              ].map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    color: "#374151",
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography>Loading tickets...</Typography>
                </TableCell>
              </TableRow>
            )}

            {error && !isLoading && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography color="error">Failed to load tickets.</Typography>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography>No tickets found.</Typography>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !error &&
              tickets.length > 0 &&
              tickets.map((t: any) => (
                <TableRow
                  hover
                  key={t._id || t.id}
                  sx={{
                    "& td": { py: 2.2, borderBottom: "1px solid #e5e7eb" },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox sx={{ color: "#9ca3af" }} />
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                      }}
                    >
                      <Avatar
                        variant="square"
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "#00bfa5",
                          fontSize: 12,
                          borderRadius: "4px",
                          color: "white",
                        }}
                      >
                        -
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{ color: "#00bfa5", fontWeight: 600 }}
                      >
                        #{t.ticketNumber || t._id?.slice(-5) || t.id || "N/A"}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      {t.subject || "-"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "#00bfa5",
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        {t.requester
                          ? t.requester
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                          : "?"}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{ color: "#111827", fontWeight: 500 }}
                      >
                        {t.requesterDetails.firstName +" "+t.requesterDetails.lastName || "Unknown"}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      {t.assignedTo || "None"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      {t.state || "New"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      {t.status || "Pending"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      {t.priority || "Medium"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
