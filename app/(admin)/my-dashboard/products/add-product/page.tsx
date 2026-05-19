import ProductForm from "@/components/admin/product/ProductForm";
import React from "react";

export default function AddProductPage() {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Add New Product
            </h1>
            
      
            <ProductForm />
        </div>
    );
}