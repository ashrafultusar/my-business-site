"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface UserProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
  logoutAction: () => void;
}

export default function DashboardSidebarClient({
  user,
  logoutAction,
}: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/my-dashboard", icon: LayoutDashboard },
    { name: "Order", href: "/my-dashboard/orders", icon: LayoutDashboard },
    { name: "Products", href: "/my-dashboard/products", icon: LayoutDashboard },
    { name: "Categorie", href: "/my-dashboard/categories", icon: LayoutDashboard },

    { name: "Administation", href: "/my-dashboard/users", icon: User },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- Mobile Header Bar --- */}
      <div className="md:hidden w-full bg-pink-700 backdrop-blur-md border-b border-pink-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-pink-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold">⚡</span>
          </div>
          <span className="text-white font-bold text-base">Dashboard</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-pink-100 hover:text-white bg-white/10 rounded-xl transition"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* --- Mobile Overlay --- */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* --- Main Sidebar --- */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen bg-pink-700 border-r border-pink-800 flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "w-64"}
        `}
      >
        {/* Collapse Button (Only Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-7 w-6 h-6 bg-pink-800 border border-pink-900 rounded-full items-center justify-center text-pink-100 hover:text-white hover:bg-pink-900 transition group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-pink-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-pink-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-sm font-black">⚡</span>
          </div>
          {!isCollapsed && (
            <span className="text-white font-black tracking-wide text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
              CORE PANEL
            </span>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                    ? "bg-white text-pink-700 font-bold shadow-md"
                    : "text-pink-100 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-pink-400 rounded-r-full shadow-sm" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive
                      ? "text-pink-700"
                      : "text-pink-200 group-hover:text-white transition-colors"
                    }`}
                />
                {!isCollapsed && <span className="text-sm">{link.name}</span>}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-24 bg-pink-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-pink-800 shadow-xl">
                    {link.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-pink-800 bg-pink-800/40 backdrop-blur-md">
          {user && !isCollapsed && (
            <div className="mb-4 p-3 bg-white/10 border border-white/10 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-300" />
              <p className="text-white text-sm font-semibold truncate">
                {user.name}
              </p>
              <p className="text-pink-200 text-xs truncate mb-2">
                {user.email}
              </p>
              <div className="flex items-center gap-1.5 bg-white/20 border border-white/30 text-white px-2.5 py-1 rounded-full w-fit">
                <ShieldAlert className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
          )}

          <form action={logoutAction}>
            <button
              type="submit"
              className={`
                w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl text-pink-100 hover:text-white hover:bg-white/10 transition duration-200 text-sm font-medium group relative
              `}
            >
              <LogOut className="w-5 h-5 shrink-0 text-pink-200 group-hover:text-white transition-colors" />
              {!isCollapsed && <span>Sign Out</span>}

              {isCollapsed && (
                <div className="absolute left-24 bg-pink-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-pink-800 shadow-xl">
                  Sign Out
                </div>
              )}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
