"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

interface ProductCardProps {
  id: string | number;
  title: string;
  price: number;
  oldPrice?: number;
  imageSrc: string;
  rating: number;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({
  id,
  title,
  price,
  oldPrice,
  imageSrc,
  rating,
  isNew,
  discount,
}: ProductCardProps) {
  const [isWishlist, setIsWishlist] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group relative flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(124,10,67,0.08)] hover:-translate-y-1 select-none w-full">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10" aria-label={`View ${title}`} />

      {/* --- TOP: Image & Badges Container --- */}
      <div className="relative bg-[#FFF5F9] aspect-square w-full overflow-hidden flex items-center justify-center p-4 sm:p-6">

        {/* Badges Left Side */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isNew && (
            <span className="bg-[#7c0a43] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
              NEW
            </span>
          )}
          {discount && (
            <span className="bg-[#D11A6E] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button Right Side */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlist(!isWishlist);
          }}
          className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center border border-gray-100 text-gray-400 hover:text-[#D11A6E] transition-all duration-300 active:scale-90 focus:outline-none"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${isWishlist ? "fill-[#D11A6E] text-[#D11A6E] scale-110" : ""
              }`}
          />
        </button>

        {/* Product Image Component */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={300}
            priority
            className="object-contain max-h-full max-w-full transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Quick View Overlay (Desktop Only) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-2">
          <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-xl shadow-md hover:bg-[#7c0a43] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 font-bold text-xs flex items-center gap-1">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- BOTTOM: Details Content Section --- */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow gap-1.5 bg-white">

        {/* Rating Section */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(rating) ? "fill-amber-400" : "text-gray-200"
                  }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-400">
            ({rating})
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 min-h-[32px] sm:min-h-[40px] leading-tight tracking-tight group-hover:text-[#7c0a43] transition-colors duration-300">
          {title}
        </h3>

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
              ৳{price.toLocaleString()}
            </span>
            {oldPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through decoration-1">
                ৳{oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Premium Pill/Icon Button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="relative z-20 group/btn overflow-hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-[#7c0a43] to-[#A1125B] text-white shadow-md shadow-[#7c0a43]/20 hover:shadow-lg hover:shadow-[#7c0a43]/30 transition-all duration-300 active:scale-95 focus:outline-none"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:-translate-y-10 duration-300 absolute" />
            <span className="text-[10px] font-black tracking-wider uppercase transition-transform translate-y-10 group-hover/btn:translate-y-0 duration-300 absolute hidden sm:block">
              +Add
            </span>
            <ShoppingCart className="w-3.5 h-3.5 sm:hidden" />
          </button>
        </div>
      </div>

    </div>
  );
}