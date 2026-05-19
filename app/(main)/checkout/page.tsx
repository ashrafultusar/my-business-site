"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/actions/order";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();

    // Form and Checkout States
    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderInfo, setOrderInfo] = useState<{ orderId: string; total: number } | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Prepare items
        const preparedItems = items.map(item => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image
        }));

        formData.append("items", JSON.stringify(preparedItems));
        formData.append("totalAmount", cartTotal.toString());

        startTransition(async () => {
            const result = await placeOrder(formData);
            if (result.success) {
                setOrderInfo({ orderId: result.orderId as string, total: cartTotal });
                clearCart();
                setShowSuccess(true);
            } else {
                alert(result.message);
            }
        });
    };

    if (showSuccess && orderInfo) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-lg p-8 md:p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-3">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-8 font-medium">Thank you for your purchase. We've received your order.</p>

                    <div className="bg-gray-50 w-full rounded-2xl p-6 mb-10 border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-500 font-bold">Order ID</span>
                            <span className="text-[#7c0a43] font-black text-lg">{orderInfo.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-bold">Total Amount</span>
                            <span className="text-gray-900 font-black text-lg">৳{orderInfo.total.toLocaleString()}</span>
                        </div>
                    </div>

                    <Link href="/" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors inline-block">
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-8 sm:pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center text-xs font-medium text-gray-500 mb-8">
                    <Link href="/" className="hover:text-[#7c0a43] transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-gray-900">Checkout</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 sm:mb-10">Checkout</h1>

                {items.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/" className="bg-[#7c0a43] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A1125B] transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Column: Form */}
                        <div className="w-full lg:w-3/5">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                                    <span className="w-8 h-8 rounded-full bg-[#7c0a43] text-white flex flex-col items-center justify-center font-bold text-sm">1</span>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">Shipping Information</h2>
                                </div>

                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            name="customerName"
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#7c0a43] focus:ring-2 focus:ring-[#7c0a43]/20 transition-all outline-none bg-gray-50/50"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="customerPhone"
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#7c0a43] focus:ring-2 focus:ring-[#7c0a43]/20 transition-all outline-none bg-gray-50/50"
                                            placeholder="e.g. 01XXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Address</label>
                                        <textarea
                                            name="address"
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#7c0a43] focus:ring-2 focus:ring-[#7c0a43]/20 transition-all outline-none resize-none bg-gray-50/50"
                                            placeholder="Full address details (House, Road, Area)..."
                                        />
                                    </div>

                                    {/* Notice */}
                                    <div className="mt-8 flex items-start gap-4 p-4 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100">
                                        <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold mb-1">Cash on Delivery</h4>
                                            <p className="text-sm">You'll pay directly to the delivery rider once you receive your package. No advance payment required.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="w-full lg:w-2/5">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

                                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-16 bg-[#FFF5F9] rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover mix-blend-multiply p-1"
                                                />
                                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shadow-sm">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex flex-col flex-1 justify-center">
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                                                <p className="text-xs font-semibold text-gray-400 mt-0.5">Size: {item.size}</p>
                                                <span className="font-black text-[#7c0a43] mt-1">৳{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900">৳{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-bold text-gray-900 line-through">Calculated later</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between font-black text-xl text-gray-900 mt-6 pt-6 border-t border-gray-200">
                                    <span>Total Pay</span>
                                    <span className="text-[#7c0a43]">৳{cartTotal.toLocaleString()}</span>
                                </div>

                                <button
                                    form="checkout-form"
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7c0a43] to-[#A1125B] text-white py-4 rounded-xl font-black text-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-[#7c0a43]/30 hover:-translate-y-0.5 transition-all"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    {isPending ? "PROCESSING..." : "CONFIRM ORDER"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
