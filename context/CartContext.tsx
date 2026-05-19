"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string; // We'll use a combination of productId and size as id to allow multiple sizes
    productId: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "id">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    cartTotal: number;
    cartCount: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedCart = localStorage.getItem("my-shop-cart");
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart));
            } catch (e) { }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("my-shop-cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (newItem: Omit<CartItem, "id">) => {
        setItems((prev) => {
            const id = `${newItem.productId}-${newItem.size}`;
            const existingItem = prev.find((item) => item.id === id);

            if (existingItem) {
                return prev.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }
            return [...prev, { ...newItem, id }];
        });
        setIsSidebarOpen(true);
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);
    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                isSidebarOpen,
                toggleSidebar,
                closeSidebar,
                cartTotal,
                cartCount,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
