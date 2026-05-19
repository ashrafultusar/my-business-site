import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import Link from "next/link";
import Image from "next/image";
import { deleteCategory } from "@/actions/category";

export default async function CategoriesPage() {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });

    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Categories
                </h1>
                <Link
                    href="/my-dashboard/categories/add-category"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Add Category
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category._id.toString()}
                                className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                            >
                                <td className="px-4 py-3">
                                    <div className="w-12 h-12 relative rounded overflow-hidden">
                                        <Image
                                            src={category.image || "/placeholder-image.jpg"}
                                            alt={category.title}
                                            sizes="48px"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                    {category.title}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="line-clamp-1">{category.description || "-"}</span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <div className="flex justify-end items-center space-x-2">
                                        <Link
                                            href={`/my-dashboard/categories/edit-category/${category._id.toString()}`}
                                            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Edit
                                        </Link>
                                        <form action={async (formData: FormData) => {
                                            "use server";
                                            await deleteCategory(category._id.toString());
                                        }}>
                                            <button
                                                type="submit"
                                                className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No categories found. Start by adding one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
