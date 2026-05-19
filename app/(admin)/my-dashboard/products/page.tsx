import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/actions/product";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Products
        </h1>
        <Link
          href="/my-dashboard/products/add-product"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id.toString()}
                className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                <td className="px-4 py-3">
                  <div className="w-12 h-12 relative rounded overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder-image.jpg"}
                      alt={product.title}
                      sizes="48px"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {product.title}
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <div className="flex justify-end items-center space-x-2">
                    <Link
                      href={`/my-dashboard/products/edit-product/${product._id.toString()}`}
                      className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <form action={async (formData: FormData) => {
                      "use server";
                      await deleteProduct(product._id.toString());
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
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No products found. Start by adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
