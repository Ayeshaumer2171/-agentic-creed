"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useGetAccountsQuery ,useSelectAccountMutation } from "@/app/services/accountsApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkIcon from "@mui/icons-material/Work";
import CallIcon from "@mui/icons-material/Call";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export default function AccountsPage() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const [selectAccount] = useSelectAccountMutation();

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography>Loading...</Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        Error fetching data
      </Typography>
    );

  const accountsData = data?.data || [];
  const allowedCompanyIndex = 0;

  const companyIcons: Record<string, JSX.Element> = {
    "Air Services": <StorefrontIcon sx={{ color: "#2AB6B6" }} />,
    "Air Sales": <WorkIcon sx={{ color: "#FF5A5F" }} />,
    "Loyalty Program": <LoyaltyIcon sx={{ color: "#FFA726" }} />,
    "Air Marketer": <ApartmentIcon sx={{ color: "#42A5F5" }} />,
    "Call Center": <CallIcon sx={{ color: "#66BB6A" }} />,
    "Air Operations": <BusinessIcon sx={{ color: "#AB47BC" }} />,
  };

  const handleCompanyClick = (company: any, index: number) => {
    if (index !== allowedCompanyIndex) {
      setAlertOpen(true);
      return;
    }
    setSelectedCompany(company._id);
  };

  const handleAccountClick = async (acc: any, index: number, company: any) => {
    if (index !== allowedCompanyIndex) {
      setAlertOpen(true);
      return;
    }
  
    try {
      const response = await selectAccount({ account: acc._id }).unwrap();
  
      console.log("Account selected successfully:", response);
  
      sessionStorage.setItem("selectedAccount", acc._id);
  
      const companyNameSlug = company.name.replace(/\s+/g, "-");
      sessionStorage.setItem("selectedCompany", companyNameSlug);
      router.push(`/dashboard/${companyNameSlug}`);
    } catch (err) {
      console.error("Error selecting account:", err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        p: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/logoagent.svg"
            alt="Agentic Creed"
            width={180}
            height={45}
            priority
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => {
              sessionStorage.removeItem("token");
              router.push("/"); 
            }}
            sx={{
              textTransform: "none",
              borderColor: "#d9d9d9",
              color: "#555",
              fontWeight: 500,
              px: 2.5,
              py: 0.8,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#ccc",
              },
            }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2AB6B6",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 0.9,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#239c9c",
              },
            }}
          >
            Organisation Admin Portal
          </Button>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1c1c1c", mb: 1 }}
        >
          Select Company Accounts
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Let’s Proceed!
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {accountsData.map((company: any, index: number) => {
          const isSelected = selectedCompany === company._id;
          const isAllowed = index === allowedCompanyIndex;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={company._id}>
              <Card
                onClick={() => handleCompanyClick(company, index)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "18px",
                  border: isSelected
                    ? "2px solid #2AB6B6"
                    : "1px solid #f1f1f1",
                  transition: "all 0.25s ease",
                  boxShadow:
                    "0px 8px 24px rgba(0, 0, 0, 0.06), 0px 4px 10px rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    boxShadow:
                      "0px 12px 30px rgba(0, 0, 0, 0.08), 0px 6px 12px rgba(0, 0, 0, 0.05)",
                    transform: "translateY(-6px)",
                    backgroundColor: "#E3F2FD",
                  },
                  width: 320,
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 2,
                  backgroundColor: !isAllowed ? "#fafafa" : "#fff",
                  opacity: !isAllowed ? 0.7 : 1,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                      gap: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: "#f3f3f3",
                      }}
                    >
                      {companyIcons[company.name] || <BusinessIcon />}
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#1c1c1c",
                        fontSize: "1.1rem",
                      }}
                    >
                      {company.name}
                    </Typography>
                  </Box>

                  {company.accounts?.length > 0 ? (
                    company.accounts.map((acc: any) => (
                      <Typography
                        key={acc._id}
                        variant="body2"
                        sx={{
                          ml: 6,
                          mb: 0.8,
                          fontSize: "1rem",
                          color: "#2b2b2b",
                          cursor: isAllowed ? "pointer" : "not-allowed",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: isAllowed ? "#2AB6B6" : "",
                            color: isAllowed ? "#fff" : "",
                            borderRadius: "6px",
                            px: 1,
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccountClick(acc, index, company);
                        }}
                      >
                        • {acc.company?.accountName || "Unnamed Account"}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ ml: 6, color: "text.secondary" }}
                    >
                      No accounts found
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Permission Denied — You can only access the first company
        </Alert>
      </Snackbar>
    </Box>
  );
}
