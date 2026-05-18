"use client";

import  { useState } from "react";
import Link from "next/link";
import { 
  Menu, 
  Smartphone, 
  User, 
  Heart, 
  ShoppingCart, 
  X,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
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
          
          <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-wide text-white">
            {/* Real Logo Color matching the theme */}
            <div className="border-2 border-white rounded-full w-7 h-7 flex items-center justify-center font-black text-sm bg-white text-[#D11A6E]">
              M
            </div>
            <span className="font-extrabold tracking-tight">My Shop</span>
          </Link>
        </div>

        {/* Right Section: App Download & Action Items */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Download App Link (Hidden on screens smaller than LG) */}
          <Link 
            href="/download" 
            className="hidden lg:flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md transition-all text-white"
          >
            <Smartphone className="w-5 h-5 text-white" />
            <span className="text-xs font-semibold leading-tight max-w-[110px]">
              Download Our App
            </span>
          </Link>

          {/* Vertical Divider for Clean Layout */}
          <span className="hidden lg:block h-6 w-[1px] bg-white/30"></span>

          {/* Action Icon Buttons */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link href="/profile" className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white">
              <User className="w-5 h-5 md:w-5 md:h-5 text-white" />
              <span className="text-[10px] md:text-xs font-medium mt-0.5">Profile</span>
            </Link>

            <Link href="/wishlist" className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white">
              <Heart className="w-5 h-5 md:w-5 md:h-5 text-white" />
              <span className="text-[10px] md:text-xs font-medium mt-0.5">Wishlist</span>
            </Link>

            <Link href="/cart" className="flex flex-col items-center justify-center min-w-[40px] hover:opacity-80 transition-opacity text-white relative">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 md:w-5 md:h-5 text-white" />
                {/* Badge Indicator */}
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-[#D11A6E]">
                  0
                </span>
              </div>
              <span className="text-[10px] md:text-xs font-medium mt-0.5">Cart</span>
            </Link>
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

      {/* --- Mobile & Tablet Sidebar Drawer (Pixel Perfect) --- */}
      <div className={`fixed top-14 md:top-16 left-0 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] w-[280px] md:w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full py-4 text-gray-800">
          
          <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Categories
          </span>
          
          {/* Menu Items with Active States and Borders */}
          <div className="flex flex-col">
            <Link href="/categories/men" onClick={toggleMenu} className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors">
              <span className="font-semibold text-sm text-gray-700">Men&apos;s Fashion</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            
            <Link href="/categories/women" onClick={toggleMenu} className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors">
              <span className="font-semibold text-sm text-gray-700">Women&apos;s Fashion</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link href="/categories/accessories" onClick={toggleMenu} className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50 transition-colors">
              <span className="font-semibold text-sm text-gray-700">Accessories</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Sticky Bottom Section inside Side Bar for Mobile Download */}
          <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100 mx-2 rounded-xl mb-4">
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