"use client";

import React, { useState } from "react";
import ProductCard from "../card/ProductCard";


interface Product {
  id: string | number;
  title: string;
  price: number;
  oldPrice?: number;
  imageSrc: string;
  rating: number;
  category: "streetwear" | "premium" | "accessories";
  isNew?: boolean;
  discount?: number;
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Oversized Cyberpunk Hoodie - Midnight Black",
    price: 2450,
    oldPrice: 3200,
    imageSrc: "/assets/image.jpg",
    rating: 4.9,
    category: "streetwear",
    isNew: true,
    discount: 23,
  },
  {
    id: 2,
    title: "Luxury Velvet Evening Dress - Deep Magenta Edition",
    price: 4800,
    imageSrc: "/assets/image.jpg",
    rating: 4.8,
    category: "premium",
    isNew: true,
  },
  {
    id: 3,
    title: "Futuristic Techwear Cargo Pants with Quick-Release Straps",
    price: 1850,
    oldPrice: 2200,
    imageSrc: "/assets/image.jpg",
    rating: 4.5,
    category: "streetwear",
    discount: 15,
  },
  {
    id: 4,
    title: "Matte Black Cyber Shield Sunglasses - UV400 Protected",
    price: 1200,
    imageSrc: "/assets/image.jpg",
    rating: 4.2,
    category: "accessories",
  },
  {
    id: 5,
    title: "Premium Handcrafted Leather Boots - Urban Classic",
    price: 5500,
    oldPrice: 6800,
    imageSrc: "/assets/image.jpg",
    rating: 4.7,
    category: "premium",
  },
  {
    id: 6,
    title: "Adjustable Tactical Utility Belt - Neon Cyber Accents",
    price: 850,
    imageSrc: "/assets/image.jpg",
    rating: 4.4,
    category: "accessories",
    isNew: true,
  },
  {
    id: 7,
    title: "Streetwear Graphic Tee - Limitless Possibilities",
    price: 990,
    oldPrice: 1400,
    imageSrc: "/assets/image.jpg",
    rating: 4.6,
    category: "streetwear",
    discount: 29,
  },
  {
    id: 8,
    title: "Minimalist Smart Chronograph Watch - Titanium Shell",
    price: 3900,
    imageSrc: "/assets/image.jpg",
    rating: 4.3,
    category: "accessories",
  }
];

export default function AllProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProducts = activeFilter === "all"
    ? DUMMY_PRODUCTS
    : DUMMY_PRODUCTS.filter((product) => product.category === activeFilter);

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER & FILTER TABS CONTROLLER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#7c0a43] rounded-full block" />
              Discover All Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
              Explore our handpicked collections tailored perfectly for your vibe.
            </p>
          </div>

          {/* Pill Style Filter Controls */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { label: "All Items", value: "all" },
              { label: "Streetwear", value: "streetwear" },
              { label: "Premium", value: "premium" },
              { label: "Accessories", value: "accessories" },
            ].map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 whitespace-nowrap focus:outline-none ${
                    isActive
                      ? "bg-[#7c0a43] text-white shadow-md shadow-[#7c0a43]/20 scale-105"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- RESPONSIVE PRODUCTS GRID --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                imageSrc={product.imageSrc}
                rating={product.rating}
                isNew={product.isNew}
                discount={product.discount}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20 text-gray-400 font-bold text-sm">
            No products found in this category!
          </div>
        )}

      </div>
    </section>
  );
}