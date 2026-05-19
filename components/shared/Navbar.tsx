"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Smartphone,
  ShoppingCart,
  X,
  ChevronRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const { cartCount, toggleSidebar } = useCart();

  // সেশন চেক করার লজিক (ইউজার লগইন আছেন কিনা)
  const isLoggedIn = status === "authenticated";
  
  // অ্যাডমিন রোল চেক করার লজিক (আপনার NextAuth সেশন অবজেক্টের স্ট্রাকচার অনুযায়ী পরিবর্তন করতে পারেন)
  const isAdmin = session?.user?.role === "admin" || true; // আপনার প্রোজেক্টে রোল না থাকলে সাময়িক ট্রু রাখতে পারেন

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async (): Promise<void> => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Navbar Base */}
      <nav className="w-full bg-[#D11A6E] text-white px-4 py-3 md:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-50 select-none h-14 md:h-16 shadow-md">
        {/* Left Section: Hamburger Menu & Logo */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleMenu}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" />
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-wide text-white"
          >
            <div className="border-2 border-white rounded-full w-7 h-7 flex items-center justify-center font-black text-sm bg-white text-[#D11A6E]">
              M
            </div>
            <span className="font-extrabold tracking-tight">My Shop</span>
          </Link>
        </div>

        {/* Right Section: App Download & Action Items */}
        <div className="flex items-center gap-4 md:gap-6">
          <span className="hidden lg:block h-6 w-[1px] bg-white/30"></span>

          {/* Action Icon Buttons */}
          <div className="flex items-center gap-4 md:gap-5">
            {isLoggedIn && isAdmin && (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/my-dashboard"
                  className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white"
                >
                  <LayoutDashboard className="w-5 h-5 md:w-5 md:h-5 text-white" />
                  <span className="text-[10px] md:text-xs font-medium mt-0.5">
                    Dashboard
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white focus:outline-none"
                >
                  <LogOut className="w-5 h-5 md:w-5 md:h-5 text-white" />
                  <span className="text-[10px] md:text-xs font-medium mt-0.5">
                    Logout
                  </span>
                </button>
              </>
            )}

            <button
              onClick={toggleSidebar}
              className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white relative focus:outline-none"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 md:w-5 md:h-5 text-white" />
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-[#D11A6E]">
                  {cartCount}
                </span>
              </div>
              <span className="text-[10px] md:text-xs font-medium mt-0.5">
                Cart
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Sidebar Menu Overlay --- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}

      {/* --- Mobile & Tablet Sidebar Drawer --- */}
      <div
        className={`fixed top-14 md:top-16 left-0 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] w-[280px] md:w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-4 text-gray-800">
          <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Categories
          </span>

          <div className="flex flex-col">
            {isLoggedIn && isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={toggleMenu}
                className="px-4 py-3.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 active:bg-gray-200 border-b border-gray-100 transition-colors"
              >
                <span className="font-bold text-sm text-[#D11A6E] flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#D11A6E]" />
                  Admin Dashboard
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            )}

            <Link
              href="/categories/men"
              onClick={toggleMenu}
              className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors"
            >
              <span className="font-semibold text-sm text-gray-700">
                Men&apos;s Fashion
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href="/categories/women"
              onClick={toggleMenu}
              className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors"
            >
              <span className="font-semibold text-sm text-gray-700">
                Women&apos;s Fashion
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href="/categories/accessories"
              onClick={toggleMenu}
              className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors"
            >
              <span className="font-semibold text-sm text-gray-700">
                Accessories
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Mobile Sidebar Bottom Section */}
          <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100 mx-2 rounded-xl mb-4 flex flex-col gap-2">
            {isLoggedIn && isAdmin && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center justify-center gap-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-bold text-sm transition-all"
              >
                <LogOut className="w-4 h-4 text-gray-700" />
                <span>Logout</span>
              </button>
            )}

            <Link
              href="/download"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2.5 bg-[#D11A6E] text-white py-2.5 px-4 rounded-lg font-bold text-sm shadow-sm hover:bg-[#b01258] transition-all"
            >
              <Smartphone className="w-4 h-4 text-white" />
              <span>Download Our App</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}