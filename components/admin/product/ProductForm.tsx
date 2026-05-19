"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/actions/product";
import Image from "next/image";

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(urls);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await addProduct(formData);
      if (result.success) {
        router.push("/my-dashboard/products");
      } else {
        setError(result.message || "Failed to add product.");
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="title"
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Product Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="category"
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Jersey, Accessories"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              name="price"
              step="0.01"
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Current Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Old Price
            </label>
            <input
              type="number"
              name="oldPrice"
              step="0.01"
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Previous Price (optional)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="description"
              rows={4}
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Product details..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sizes (Comma separated) <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="sizes"
              className="mt-1 w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., S, M, L, XL"
            />
          </div>
          <div className="flex items-center space-x-3 mt-8">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              value="true"
              defaultChecked
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="inStock"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              In Stock
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-700 dark:file:text-zinc-300 mb-4 cursor-pointer"
          />

          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {previewImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </>
  );
}
