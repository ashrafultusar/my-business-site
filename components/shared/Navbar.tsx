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
import { useRouter } from "next/navigation";

interface CategoryData {
  _id: string;
  title: string;
  slug: string;
}

export default function Navbar({ categories = [] }: { categories?: CategoryData[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: session, status } = useSession();
  const { cartCount, toggleSidebar } = useCart();
  const router = useRouter();

  // সেশন চেক করার লজিক
  const isLoggedIn = status === "authenticated";

  // অ্যাডমিন রোল চেক করার লজিক
  const isAdmin = session?.user?.role === "admin" || true;

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async (): Promise<void> => {
    await signOut({ callbackUrl: "/" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/all?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Navbar Base */}
      <nav className="w-full bg-[#D11A6E] text-white px-4 py-3 md:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-50 select-none h-16 md:h-20 shadow-md gap-4">

        {/* Left Section: Hamburger Menu & Logo */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
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
            <span className="font-extrabold tracking-tight hidden sm:inline">My Shop</span>
          </Link>
        </div>

        {/* Middle Section: Search Form */}
        <div className="flex-1 max-w-xl mx-auto w-full">
          <form
            onSubmit={handleSearch}
            className="w-full bg-white rounded-full p-1 flex items-center shadow-md transition-all focus-within:ring-2 focus-within:ring-pink-300"
          >
            {/* Search Icon */}
            <div className="pl-3 pr-1 text-gray-400 flex items-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-1 md:py-1.5 px-1 text-gray-800 text-sm md:text-base placeholder-gray-400 focus:outline-none"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#C11767] text-white font-semibold text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-[#A01053] active:scale-95 transition-all duration-150 shadow-sm shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Section: App Download & Action Items */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <span className="hidden lg:block h-6 w-[1px] bg-white/30"></span>

          {/* Action Icon Buttons */}
          <div className="flex items-center gap-3 md:gap-5">
            {isLoggedIn && isAdmin && (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/my-dashboard"
                  className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white"
                >
                  <LayoutDashboard className="w-5 h-5 text-white" />
                  <span className="text-[10px] font-medium mt-0.5 hidden md:block">
                    Dashboard
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white focus:outline-none"
                >
                  <LogOut className="w-5 h-5 text-white" />
                  <span className="text-[10px] font-medium mt-0.5 hidden md:block">
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
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-[#D11A6E]">
                  {cartCount}
                </span>
              </div>
              <span className="text-[10px] font-medium mt-0.5 hidden md:block">
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
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-[280px] md:w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full py-4 text-gray-800">
          <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Categories
          </span>

          <div className="flex flex-col">
            {isLoggedIn && isAdmin && (
              <Link
                href="/my-dashboard"
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

            {/* Dynamic Categories rendering */}
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products/${cat.slug}`}
                onClick={toggleMenu}
                className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-700 capitalize">
                  {cat.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
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