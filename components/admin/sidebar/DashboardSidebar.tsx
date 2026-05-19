import React from "react";
import { logoutUser } from "@/actions/auth.actions";
import { getCurrentUser } from "@/lib/data/getUser";
import DashboardSidebarClient from "./Sidebar";

export default async function DashboardSidebar() {
  const user = await getCurrentUser();
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;

  return <DashboardSidebarClient user={plainUser} logoutAction={logoutUser} />;
}
