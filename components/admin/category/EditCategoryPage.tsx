"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/actions/category";
import Image from "next/image";

interface CategoryData {
    _id: string;
    title: string;
    description?: string;
    image?: string;
}

export default function EditCategoryPage({ initialData }: { initialData: CategoryData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [existingImage, setExistingImage] = useState<string | null>(initialData.image || null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [newPreview, setNewPreview] = useState<string | null>(null);
    const [error, setError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewFile(file);
            setNewPreview(URL.createObjectURL(file));
            // Once we upload a new one, the old one goes away conceptually
            setExistingImage(null);
        }
    };

    const removeExistingImage = () => setExistingImage(null);
    const removeNewImage = () => {
        setNewFile(null);
        setNewPreview(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        formData.delete("image");

        if (newFile) {
            formData.append("image", newFile);
        }

        // Send existing image string if kept
        if (existingImage) {
            formData.append("keptImage", existingImage);
        }

        try {
            const result = await updateCategory(initialData._id, formData);
            if (result.success) {
                router.push("/my-dashboard/categories");
            } else {
                setError(result.message || "Failed to update category.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={initialData.title}
                        required
                        type="text"
                        name="title"
                        className="mt-1 w-full p-2 border rounded-md bg-pink-50 dark:border-zinc-700 text-pink-950 focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300">
                        Description <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                        defaultValue={initialData.description}
                        name="description"
                        rows={4}
                        className="mt-1 w-full p-2 border rounded-md bg-pink-50 dark:border-zinc-700 text-pink-950 focus:ring-2 focus:ring-pink-500 outline-none"
                    ></textarea>
                </div>
            </div>

            <div className="pt-4 border-t border-pink-200 dark:border-zinc-700">
                <label className="block text-sm font-medium text-pink-900/80 dark:text-gray-300 mb-2">
                    Category Image <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 dark:file:bg-zinc-700 dark:file:text-zinc-300 mb-4 cursor-pointer"
                />

                <div className="flex flex-wrap gap-4 mt-4">
                    {existingImage && (
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-pink-200 dark:border-zinc-700 shadow-sm group">
                            <Image src={existingImage} alt="Existing" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                            <button
                                type="button"
                                onClick={removeExistingImage}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    {newPreview && (
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-pink-400 shadow-sm group">
                            <Image src={newPreview} alt="New Preview" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                            <div className="absolute top-1 left-1 bg-pink-600 text-xs px-1 text-white rounded opacity-80">New</div>
                            <button
                                type="button"
                                onClick={removeNewImage}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full xl:w-auto px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating Category..." : "Update Category"}
                </button>
            </div>
        </form>
    );
}
