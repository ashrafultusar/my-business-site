import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/getProduct";
import EditProductForm from "@/components/admin/product/EditProductPage";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;
    
    // ডাটাবেজ থেকে প্রোডাক্টের বর্তমান ডেটা নিয়ে আসা
    const product = await getProductById(id);

    // প্রোডাক্ট না পাওয়া গেলে Next.js 404 পেজে রিডাইরেক্ট করবে
    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Edit Product
            </h1>
            
            {/* আলাদা করা এডিট ফর্ম কম্পোনেন্ট */}
            <EditProductForm initialData={product} />
        </div>
    );
}