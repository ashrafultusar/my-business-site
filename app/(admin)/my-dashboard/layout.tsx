import React from "react";
import Link from "next/link";
import { logoutUser } from "@/actions/auth.actions";
import { getCurrentUser } from "@/lib/data/getUser";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-sm">⚡</span>
                        </div>
                        <span className="text-white font-bold text-lg">Dashboard</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/my-dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                        <span>🏠</span>
                        <span className="text-sm font-medium">Overview</span>
                    </Link>
                    <Link
                        href="/my-dashboard/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                        <span>👤</span>
                        <span className="text-sm font-medium">Profile</span>
                    </Link>
                </nav>

                {/* User Info + Logout */}
                <div className="p-4 border-t border-white/5">
                    {user && (
                        <div className="mb-3 px-3">
                            <p className="text-white text-sm font-medium truncate">{user.name}</p>
                            <p className="text-slate-500 text-xs truncate">{user.email}</p>
                            <span className="mt-1 inline-block text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
                                {user.role}
                            </span>
                        </div>
                    )}
                    <form action={logoutUser}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-sm font-medium"
                        >
                            <span>🚪</span>
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;