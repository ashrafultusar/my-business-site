import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/actions/product";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <div className="p-6 bg-white border border-pink-100 rounded-2xl shadow-xl shadow-pink-900/5 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-950">
          Products
        </h1>
        <Link
          href="/my-dashboard/products/add-product"
          className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 shadow-lg shadow-pink-600/20 transition-all font-medium"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-pink-900/80 uppercase bg-pink-50/50">
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
                className="border-b border-pink-50 hover:bg-pink-50/30 transition-colors"
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
                <td className="px-4 py-3 font-medium text-slate-900">
                  {product.title}
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <div className="flex justify-end items-center space-x-2">
                    <Link
                      href={`/my-dashboard/products/edit-product/${product._id.toString()}`}
                      className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 font-medium transition"
                    >
                      Edit
                    </Link>
                    <form action={async (formData: FormData) => {
                      "use server";
                      await deleteProduct(product._id.toString());
                    }}>
                      <button
                        type="submit"
                        className="inline-block px-3 py-1 bg-rose-500/10 text-rose-600 rounded-lg hover:bg-rose-500/20 font-medium transition"
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
