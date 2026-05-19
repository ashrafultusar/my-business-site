"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, ShieldCheck, Truck, RefreshCcw, ChevronRight, X, CheckCircle2, ShoppingCart, Star } from "lucide-react";
import ProductCard from "@/components/main/card/ProductCard";
import { placeOrder } from "@/actions/order";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage({
    product,
    relatedProducts
}: {
    product: any,
    relatedProducts: any[]
}) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlist, setIsWishlist] = useState(false);
    const [selectedSize, setSelectedSize] = useState("M");



    const { addToCart } = useCart();
    const router = useRouter();


    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-8 sm:pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb - SEO Friendly internal linking */}
                <nav className="flex items-center text-xs font-medium text-gray-500 mb-6">
                    <Link href="/" className="hover:text-[#7c0a43] transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <Link href={`/products/${product.category.toLowerCase()}`} className="hover:text-[#7c0a43] transition-colors uppercase">
                        {product.category}
                    </Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm border border-gray-100">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-2xl bg-[#FFF5F9] overflow-hidden flex items-center justify-center p-8 group">
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 z-10 bg-[#D11A6E] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                                    -{discount}% OFF
                                </span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Image
                                src={product.images ? product.images[selectedImage] : product.imageSrc}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="object-contain max-h-full max-w-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
                                {product.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex-shrink-0 bg-[#FFF5F9] overflow-hidden p-2 transition-all duration-200 focus:outline-none ${selectedImage === idx
                                            ? "ring-2 ring-[#7c0a43] ring-offset-2 scale-95"
                                            : "ring-1 ring-gray-100 hover:ring-[#7c0a43]/50 opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.title} - View ${idx + 1}`}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details & Actions */}
                    <div className="w-full lg:w-1/2 flex flex-col">

                        <div className="flex items-center justify-between mb-2">
                            <Link href={`/products/${product.category.toLowerCase()}`}>
                                <span className="text-[#7c0a43] font-bold text-xs tracking-widest uppercase bg-[#7c0a43]/10 px-3 py-1 rounded-full w-max hover:bg-[#7c0a43]/20 transition-colors cursor-pointer">
                                    {product.category}
                                </span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <button className="text-gray-400 hover:text-gray-700 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsWishlist(!isWishlist)}
                                    className="text-gray-400 hover:text-[#D11A6E] transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                                >
                                    <Heart className={`w-5 h-5 transition-all ${isWishlist ? "fill-[#D11A6E] text-[#D11A6E] scale-110" : ""}`} />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-sm text-gray-800">{product.rating}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-400 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-gray-800 transition-colors">
                                {product.reviews || 0} Customer Reviews
                            </span>
                        </div>

                        <div className="flex items-end gap-4 mb-6">
                            <span className="text-4xl font-black text-gray-900 tracking-tighter">
                                ৳{product.price.toLocaleString()}
                            </span>
                            {product.oldPrice && (
                                <span className="text-xl text-gray-400 line-through font-medium mb-1 decoration-2">
                                    ৳{product.oldPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                            {product.description || "No description available for this product."}
                        </p>

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-gray-900">Select Size</h3>
                                    <button className="text-sm text-[#7c0a43] font-medium hover:underline underline-offset-4">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-200 ${selectedSize === size
                                                ? "bg-[#7c0a43] text-white shadow-md shadow-[#7c0a43]/30 scale-105"
                                                : "bg-white border-2 border-gray-100 text-gray-600 hover:border-[#7c0a43]/50 hover:text-[#7c0a43]"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-6 border-t border-gray-100">
                            {/* Quantity */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 w-full sm:w-32 border border-gray-200">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-600 font-medium transition-all"
                                >
                                    -
                                </button>
                                <span className="font-bold text-gray-900 text-lg w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-600 font-medium transition-all"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={() => addToCart({
                                    productId: product.id.toString(),
                                    title: product.title,
                                    price: product.price,
                                    quantity: quantity,
                                    size: selectedSize,
                                    image: product.images ? product.images[0] : product.imageSrc
                                })}
                                className={`flex-1 rounded-2xl font-black text-lg py-4 px-6 flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${product.inStock !== false
                                    ? "bg-gradient-to-r from-[#7c0a43] to-[#A1125B] text-white shadow-[#7c0a43]/25 hover:shadow-2xl hover:shadow-[#7c0a43]/40 hover:-translate-y-1"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                                    }`}
                                disabled={product.inStock === false}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {product.inStock !== false ? "ADD TO CART" : "OUT OF STOCK"}
                            </button>

                            {/* Buy Now */}
                            <button
                                onClick={() => {
                                    addToCart({
                                        productId: product.id.toString(),
                                        title: product.title,
                                        price: product.price,
                                        quantity: quantity,
                                        size: selectedSize,
                                        image: product.images ? product.images[0] : product.imageSrc
                                    });
                                    router.push('/checkout');
                                }}
                                className={`flex-1 rounded-2xl font-black text-lg py-4 px-6 flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${product.inStock !== false
                                    ? "bg-gray-900 text-white shadow-gray-900/25 hover:shadow-2xl hover:shadow-gray-900/40 hover:-translate-y-1"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                                    }`}
                                disabled={product.inStock === false}
                            >
                                BUY NOW
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b border-gray-100 bg-gray-50/50 rounded-2xl px-6">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck className="w-6 h-6 text-[#7c0a43]" />
                                <span className="text-xs font-bold text-gray-700">Free, Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RefreshCcw className="w-6 h-6 text-[#7c0a43]" />
                                <span className="text-xs font-bold text-gray-700">7 Days Return</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[#7c0a43]" />
                                <span className="text-xs font-bold text-gray-700">Secure Payment</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Details Section (SEO Rich Text) */}
                <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 border-b border-gray-100 pb-4 mb-6">
                        Product Features & Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        <div>
                            <p className="text-gray-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                                {product.description || "Learn more about this product..."}
                            </p>
                            {product.features && (
                                <ul className="space-y-3">
                                    {product.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#7c0a43] mt-2 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-max">
                            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Specifications</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-500 font-medium text-sm">SKU</span>
                                    <span className="text-gray-900 font-bold text-sm tracking-wide">{product.sku || "N/A"}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-500 font-medium text-sm">Category</span>
                                    <span className="text-gray-900 font-bold text-sm capitalize">{product.category}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-500 font-medium text-sm">Availability</span>
                                    <span className={`${product.inStock !== false ? "text-green-600" : "text-red-500"} font-bold text-sm`}>
                                        {product.inStock !== false ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RELATED PRODUCTS SECTION --- */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 sm:mt-24">
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-8">
                            <span className="w-2.5 h-6 bg-[#7c0a43] rounded-full block" />
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((rp) => (
                                <ProductCard
                                    key={rp.id}
                                    id={rp.id}
                                    title={rp.title}
                                    price={rp.price}
                                    oldPrice={rp.oldPrice}
                                    imageSrc={rp.imageSrc}
                                    rating={rp.rating}
                                    isNew={rp.isNew}
                                    discount={rp.discount}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
