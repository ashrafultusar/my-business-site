export const dynamic = "force-dynamic";

import DashboardSidebar from "@/components/admin/sidebar/DashboardSidebar";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* রেসপনসিভ ও ইউনিক সাইডবার */}
      <DashboardSidebar />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 h-[calc(100vh-69px)] md:h-screen overflow-y-auto p-4 md:p-8 text-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;