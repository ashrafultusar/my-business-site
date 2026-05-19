"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/actions/category";
import Image from "next/image";

export default function CategoryForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        try {
            const result = await addCategory(formData);
            if (result.success) {
                router.push("/my-dashboard/categories");
            } else {
                setError(result.message || "Failed to add category.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            name="title"
                            className="mt-1 w-full p-2 border rounded-md bg-pink-50 dark:border-zinc-700 text-pink-950 focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Category Name"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300">
                            Description <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            className="mt-1 w-full p-2 border rounded-md bg-pink-50 dark:border-zinc-700 text-pink-950 focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Category details..."
                        ></textarea>
                    </div>
                </div>

                <div className="pt-4 border-t border-pink-200 dark:border-zinc-700">
                    <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300 mb-2">
                        Category Image <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 dark:file:bg-zinc-700 dark:file:text-zinc-300 mb-4 cursor-pointer"
                    />

                    {previewImage && (
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-pink-200 dark:border-zinc-700 shadow-sm">
                            <Image
                                src={previewImage}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full xl:w-auto px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Adding Category..." : "Add Category"}
                    </button>
                </div>
            </form>
        </>
    );
}
