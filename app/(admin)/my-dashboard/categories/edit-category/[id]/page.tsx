import React from "react";
import { notFound } from "next/navigation";
import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import EditCategoryPage from "@/components/admin/category/EditCategoryPage";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditCategoryServerPage({ params }: Props) {
    const { id } = await params;

    await connectDB();
    const categoryDocument = await Category.findById(id).lean();

    if (!categoryDocument) {
        notFound();
    }

    const category = {
        _id: categoryDocument._id?.toString(),
        title: categoryDocument.title,
        description: categoryDocument.description,
        image: categoryDocument.image,
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white border border-pink-100 rounded-2xl shadow-xl shadow-pink-900/5 mt-6">
            <h1 className="text-2xl font-bold mb-6 text-pink-950">
                Edit Category
            </h1>

            <EditCategoryPage initialData={category} />
        </div>
    );
}
