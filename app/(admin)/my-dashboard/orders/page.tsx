import { connectDB } from "@/db/dbConfig";
import Order from "@/models/Order";
import Link from "next/link";
import { Eye } from "lucide-react";

export default async function OrdersPage() {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });

    return (
        <div className="p-6 bg-white border border-pink-100 rounded-2xl shadow-xl shadow-pink-900/5 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-pink-950">
                    Order Management
                </h1>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-pink-900/80 uppercase bg-pink-50/50">
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
                                className="border-b border-pink-50 hover:bg-pink-50/30 transition-colors"
                            >
                                <td className="px-4 py-3 font-semibold text-slate-900">
                                    #{order.orderId}
                                </td>
                                <td className="px-4 py-3">
                                    <div>
                                        <div className="font-semibold text-slate-900">{order.customerName}</div>
                                        <div className="text-xs text-pink-900/60">{order.customerPhone}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 font-bold text-pink-700">
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
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 hover:text-pink-800 transition"
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
