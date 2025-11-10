"use client";

import React from "react";
import DashboardLayout from "@/app/dashboard/[companyName]/layout"; 

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
