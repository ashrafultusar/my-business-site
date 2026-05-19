"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/product";
import Image from "next/image";

interface ProductData {
    _id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    category: string;
    sizes: string[];
    inStock: boolean;
    images: string[];
}

export default function EditProductForm({ initialData }: { initialData: ProductData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>(initialData.images || []);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [error, setError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const urls = files.map((file) => URL.createObjectURL(file));
            setNewFiles(prev => [...prev, ...files]);
            setNewPreviews(prev => [...prev, ...urls]);

            // clear input so same files can be selected again
            e.target.value = "";
        }
    };

    const removeExistingImage = (idx: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== idx));
    };

    const removeNewImage = (idx: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== idx));
        setNewPreviews(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        // Remove browser's default file input to handle manually
        formData.delete("images");

        // Append actual tracked files
        newFiles.forEach(file => {
            formData.append("images", file);
        });

        // Append kept existing images
        formData.append("keptImages", JSON.stringify(existingImages));

        try {
            const result = await updateProduct(initialData._id, formData);
            if (result.success) {
                router.push("/my-dashboard/products");
            } else {
                setError(result.message || "Failed to update product.");
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title <span className="text-red-500">*</span></label>
                    <input defaultValue={initialData.title} required type="text" name="title" className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category <span className="text-red-500">*</span></label>
                    <input defaultValue={initialData.category} required type="text" name="category" className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price <span className="text-red-500">*</span></label>
                    <input defaultValue={initialData.price} required type="number" name="price" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Old Price</label>
                    <input defaultValue={initialData.oldPrice} type="number" name="oldPrice" step="0.01" className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description <span className="text-red-500">*</span></label>
                    <textarea defaultValue={initialData.description} required name="description" rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sizes (Comma separated) <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input defaultValue={initialData.sizes?.join(", ")} type="text" name="sizes" className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., S, M, L, XL" />
                </div>
                <div className="flex items-center space-x-3 mt-8">
                    <input defaultChecked={initialData.inStock} type="checkbox" id="inStock" name="inStock" value="true" className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                    <label htmlFor="inStock" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">In Stock</label>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-700 dark:file:text-zinc-300 mb-4 cursor-pointer"
                />

                <div className="flex flex-wrap gap-4 mt-4">
                    {/* Existing Images */}
                    {existingImages.map((src, idx) => (
                        <div key={`existing-${idx}`} className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm group">
                            <Image src={src} alt={`Existing ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                            <button
                                type="button"
                                onClick={() => removeExistingImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    {/* New Previews */}
                    {newPreviews.map((src, idx) => (
                        <div key={`new-${idx}`} className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-blue-400 shadow-sm group">
                            <Image src={src} alt={`New Preview ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                            <div className="absolute top-1 left-1 bg-blue-600 text-xs px-1 text-white rounded opacity-80">New</div>
                            <button
                                type="button"
                                onClick={() => removeNewImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating Product..." : "Update Product"}
                </button>
            </div>
        </form>
    );
}