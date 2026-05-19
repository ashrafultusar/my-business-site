"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { DUMMY_PRODUCTS, Product } from "@/lib/dummyData";
import ProductCard from "@/components/main/card/ProductCard";

export default function CategoryClientPage({ params }: { params: { slug: string } }) {
    const currentCategory = params.slug.toLowerCase();

    // State for filters
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<number>(10000); // Max default
    const [sortBy, setSortBy] = useState<"high-to-low" | "low-to-high" | "default">("default");

    // All unique categories for sidebar
    const categories = ["all", "streetwear", "premium", "accessories"];

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = DUMMY_PRODUCTS.filter(p => p.price <= priceRange);

        if (currentCategory !== "all") {
            result = result.filter(p => p.category === currentCategory);
        }

        if (sortBy === "high-to-low") {
            result = result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "low-to-high") {
            result = result.sort((a, b) => a.price - b.price);
        }

        return result;
    }, [currentCategory, priceRange, sortBy]);


    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-8 sm:pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="mb-8">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-[#7c0a43] transition-colors mb-2 inline-block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight capitalize">
                        {currentCategory === "all" ? "All Collection" : `${currentCategory} Collection`}
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Showing {filteredProducts.length} premium pieces
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-bold py-3 rounded-xl mb-6 shadow-sm active:scale-95 transition-all"
                    onClick={() => setIsMobileFiltersOpen(true)}
                >
                    <Filter className="w-5 h-5 text-[#7c0a43]" />
                    Filters & Sorting
                </button>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- SIDEBAR --- */}
                    <aside className={`fixed inset-0 z-50 lg:z-auto bg-black/50 lg:bg-transparent lg:static w-full lg:w-1/4 transition-opacity duration-300 ${isMobileFiltersOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}`}>
                        <div className={`fixed inset-y-0 left-0 bg-white lg:bg-transparent w-4/5 max-w-sm lg:w-full lg:max-w-none shadow-2xl lg:shadow-none p-6 lg:p-0 transform transition-transform duration-300 overflow-y-auto lg:overflow-visible ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                            <div className="flex justify-between items-center mb-8 lg:hidden">
                                <h2 className="text-xl font-black text-gray-900">Filters</h2>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="mb-10 lg:bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100">
                                <h3 className="font-black text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Categories</h3>
                                <ul className="space-y-3">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <Link
                                                href={`/category/${cat}`}
                                                className={`flex items-center justify-between text-sm font-bold capitalize transition-all ${currentCategory === cat
                                                        ? "text-[#7c0a43]"
                                                        : "text-gray-500 hover:text-gray-900"
                                                    }`}
                                            >
                                                {cat}
                                                {currentCategory === cat && <Check className="w-4 h-4" />}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-10 lg:bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100">
                                <div className="flex justify-between items-end border-b border-gray-100 pb-3 mb-4">
                                    <h3 className="font-black text-lg text-gray-900">Max Price</h3>
                                    <span className="text-[#7c0a43] font-bold text-sm">৳{priceRange}</span>
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

                            {/* Sorting */}
                            <div className="mb-10 lg:bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100">
                                <h3 className="font-black text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                                    <ChevronDown className="w-5 h-5 text-[#7c0a43]" />
                                    Sort By
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { id: "default", label: "Featured" },
                                        { id: "high-to-low", label: "Price: High to Low" },
                                        { id: "low-to-high", label: "Price: Low to High" }
                                    ].map((option) => (
                                        <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${sortBy === option.id ? 'border-[#7c0a43]' : 'border-gray-300 group-hover:border-[#7c0a43]'}`}>
                                                {sortBy === option.id && <div className="w-2.5 h-2.5 bg-[#7c0a43] rounded-full" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="sort"
                                                value={option.id}
                                                className="hidden"
                                                checked={sortBy === option.id}
                                                onChange={() => setSortBy(option.id as any)}
                                            />
                                            <span className={`text-sm font-bold transition-all ${sortBy === option.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* --- MAIN CONTENT (PRODUCT GRID) --- */}
                    <div className="w-full lg:w-3/4">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        oldPrice={product.oldPrice}
                                        imageSrc={product.images ? product.images[0] : product.imageSrc}
                                        rating={product.rating}
                                        isNew={product.isNew}
                                        discount={product.discount}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center shadow-sm">
                                <Filter className="w-12 h-12 text-gray-200 mb-4" />
                                <h3 className="text-xl font-black text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 font-medium">
                                    We couldn't find anything matching your exact filters. Try adjusting the price range or category.
                                </p>
                                <button
                                    onClick={() => {
                                        setPriceRange(10000);
                                        setSortBy("default");
                                    }}
                                    className="mt-6 font-bold text-[#7c0a43] hover:underline underline-offset-4"
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
