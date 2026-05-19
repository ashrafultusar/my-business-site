"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
    const { isSidebarOpen, closeSidebar, items, removeFromCart, updateQuantity, cartTotal } = useCart();

    // Fix hydration mismatch warning for Next.js app router 
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-100">
                            <h2 className="flex items-center gap-2 text-xl font-black text-gray-900">
                                <ShoppingBag className="w-5 h-5 text-[#7c0a43]" />
                                Your Cart
                            </h2>
                            <button
                                onClick={closeSidebar}
                                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                                    <ShoppingBag className="w-16 h-16 text-gray-200" />
                                    <p className="text-lg font-bold">Your cart is empty.</p>
                                    <button
                                        onClick={closeSidebar}
                                        className="text-[#7c0a43] font-bold hover:underline"
                                    >
                                        Start shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                                        <div className="relative w-20 h-24 bg-[#FFF5F9] rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover mix-blend-multiply p-1"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div className="pr-6">
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                                                <p className="text-xs font-semibold text-gray-400 mt-0.5">Size: {item.size}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-black text-[#7c0a43]">৳{item.price.toLocaleString()}</span>
                                                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center justify-between font-black text-lg text-gray-900 mb-6">
                                    <span>Subtotal</span>
                                    <span>৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <Link href="/checkout" className="w-full" onClick={closeSidebar}>
                                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#7c0a43] to-[#A1125B] text-white py-4 rounded-xl font-black text-lg hover:shadow-xl hover:shadow-[#7c0a43]/30 hover:-translate-y-0.5 transition-all">
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Checkout
                                    </button>
                                </Link>
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Shipping, taxes, and discount codes calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
