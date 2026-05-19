import { connectDB } from "@/db/dbConfig";
import Order from "@/models/Order";
import Link from "next/link";
import { Eye } from "lucide-react";

export default async function OrdersPage() {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });

    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Order Management
                </h1>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id.toString()}
                                className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                            >
                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                                    #{order.orderId}
                                </td>
                                <td className="px-4 py-3">
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 font-bold text-[#7c0a43]">
                                    ৳{order.totalAmount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === "pending" ? "bg-amber-100 text-amber-700" :
                                        order.status === "processing" ? "bg-blue-100 text-blue-700" :
                                            order.status === "shipped" ? "bg-indigo-100 text-indigo-700" :
                                                order.status === "delivered" ? "bg-green-100 text-green-700" :
                                                    "bg-red-100 text-red-700"
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <Link
                                        href={`/my-dashboard/orders/${order._id.toString()}`}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                                    >
                                        <Eye className="w-4 h-4" /> View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-12 text-center text-gray-500 font-medium"
                                >
                                    No orders have been placed yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
