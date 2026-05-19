"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import ProductCard from "@/components/main/card/ProductCard";

interface CategoryClientPageProps {
  slug: string;
  searchQuery?: string;
  categories: { id: string; title: string; slug: string }[];
  initialProducts: {
    id: string;
    title: string;
    price: number;
    oldPrice: number | null;
    imageSrc: string;
    images: string[];
    rating: number;
    isNew: boolean;
    discount: number;
    category: string;
  }[];
}

export default function CategoryClientPage({
  slug,
  categories,
  searchQuery,
  initialProducts,
}: CategoryClientPageProps) {
  const currentCategory = slug.toLowerCase();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<
    "high-to-low" | "low-to-high" | "default"
  >("default");

  const allSidebarCategories = [
    { id: "all", title: "All", slug: "all" },
    ...categories,
  ];

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter((p) => p.price <= priceRange);

    if (sortBy === "high-to-low") {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "low-to-high") {
      result = result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [initialProducts, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-6 md:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-[#7c0a43] transition-colors mb-2 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight capitalize break-words">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : (currentCategory === "all"
                ? "All Collection"
                : `${currentCategory} Collection`)}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Showing {filteredProducts.length} premium pieces
          </p>
        </div>

        {/* --- MOBILE/TABLET FILTER BUTTON --- */}
        <div className="block lg:hidden mb-6">
          <button
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-bold py-3 rounded-xl shadow-sm active:scale-95 transition-all"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="w-5 h-5 text-[#7c0a43]" />
            Filters & Sorting
          </button>
        </div>

        {/* --- MAIN LAYOUT RESPONSIVE GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* --- SIDEBAR (Desktop e Left side, Mobile/Tab e Overlay Drawer) --- */}
          <aside
            className={`
                        fixed inset-0 z-50 bg-black/50 transition-opacity duration-300
                        lg:static lg:z-auto lg:bg-transparent lg:w-1/4 lg:opacity-100 lg:visible
                        ${isMobileFiltersOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible"
              }
                    `}
          >
            {/* Backdrop Click handle to close drawer */}
            <div
              className="absolute inset-0 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />

            {/* Sidebar Body */}
            <div
              className={`
                            absolute inset-y-0 left-0 bg-white w-4/5 max-w-xs p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300
                            lg:static lg:w-full lg:max-w-none lg:p-0 lg:shadow-none lg:bg-transparent lg:translate-x-0
                            ${isMobileFiltersOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
                }
                        `}
            >
              {/* Close Header for Mobile */}
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-lg font-black text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Section: Categories */}
              <div className="mb-6 lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100">
                <h3 className="font-black text-base text-gray-900 border-b border-gray-100 pb-3 mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {allSidebarCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/products/${cat.slug}`}
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className={`flex items-center justify-between text-sm font-bold capitalize py-1.5 transition-all ${currentCategory === cat.slug
                          ? "text-[#7c0a43]"
                          : "text-gray-500 hover:text-gray-900"
                          }`}
                      >
                        {cat.title}
                        {currentCategory === cat.slug && (
                          <Check className="w-4 h-4" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section: Price Slider */}
              <div className="mb-6 lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100">
                <div className="flex justify-between items-end border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-black text-base text-gray-900">
                    Max Price
                  </h3>
                  <span className="text-[#7c0a43] font-bold text-sm">
                    ৳{priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7c0a43]"
                />
                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                  <span>৳500</span>
                  <span>৳10,000+</span>
                </div>
              </div>

              {/* Section: Sorting */}
              <div className="mb-6 lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100">
                <h3 className="font-black text-base text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-[#7c0a43]" />
                  Sort By
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "default", label: "Featured" },
                    { id: "high-to-low", label: "Price: High to Low" },
                    { id: "low-to-high", label: "Price: Low to High" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${sortBy === option.id
                          ? "border-[#7c0a43]"
                          : "border-gray-300 group-hover:border-[#7c0a43]"
                          }`}
                      >
                        {sortBy === option.id && (
                          <div className="w-2 h-2 bg-[#7c0a43] rounded-full" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="sort"
                        value={option.id}
                        className="hidden"
                        checked={sortBy === option.id}
                        onChange={() => setSortBy(option.id as any)}
                      />
                      <span
                        className={`text-sm font-bold transition-all ${sortBy === option.id
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-900"
                          }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    oldPrice={product.oldPrice || undefined}
                    imageSrc={
                      product.images ? product.images[0] : product.imageSrc
                    }
                    rating={product.rating}
                    isNew={product.isNew}
                    discount={product.discount}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-64 bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center shadow-sm">
                <Filter className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="text-lg font-black text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Try adjusting the filters or price range to find products.
                </p>
                <button
                  onClick={() => {
                    setPriceRange(10000);
                    setSortBy("default");
                  }}
                  className="mt-4 font-bold text-sm text-[#7c0a43] hover:underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
