import { connectDB } from "@/db/dbConfig";
import Order from "@/models/Order";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StatusUpdater from "./StatusUpdater";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();

  if (!order) notFound();

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/my-dashboard/orders"
          className="p-2 bg-white bg-pink-50 rounded-full shadow-sm hover:bg-pink-50 dark:hover:bg-zinc-700 transition"
        >
          <ArrowLeft className="w-5 h-5 text-pink-900/70 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-pink-950 text-pink-950">
          Order Details
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Order Items & Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm border border-pink-100 ">
            <h2 className="text-lg font-bold text-pink-950 text-pink-950 mb-4">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {order?.items?.map((item: any, index: number) => (
                <div
                  key={item._id?.toString() || `${item.title}-${item.size}-${index}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-pink-100  bg-pink-50 bg-pink-50/50"
                >
                  <div className="w-16 h-16 relative bg-white rounded-lg overflow-hidden shrink-0 border border-pink-100">
                    <Image
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-pink-950 text-pink-950 truncate">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Size:{" "}
                      <span className="font-medium text-pink-900/80 dark:text-gray-300 uppercase">
                        {item.size}
                      </span>{" "}
                      &bull; Qty:{" "}
                      <span className="font-medium text-pink-900/80 dark:text-gray-300">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-950 text-pink-950">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      ৳{item.price.toLocaleString()} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm border border-pink-100 ">
            <h2 className="text-lg font-bold text-pink-950 text-pink-950 mb-4">
              Customer Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                  Full Name
                </label>
                <div className="font-medium text-pink-950 dark:text-gray-200">
                  {order.customerName}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                  Phone
                </label>
                <div className="font-medium text-pink-950 dark:text-gray-200">
                  {order.customerPhone}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                  Delivery Address
                </label>
                <div className="font-medium text-pink-950 dark:text-gray-200 bg-pink-50 bg-pink-50 p-3 rounded-lg border border-pink-100 dark:border-zinc-700">
                  {order.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Summary & Status */}
        <div className="space-y-6">
          {/* Status updater */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm border border-pink-100 ">
            <h2 className="text-lg font-bold text-pink-950 text-pink-950 mb-4">
              Order Status
            </h2>
            <StatusUpdater
              orderId={order._id?.toString()}
              currentStatus={order.status}
            />
          </div>

          {/* Summary */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm border border-pink-100 ">
            <h2 className="text-lg font-bold text-pink-950 text-pink-950 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal (
                  {order.items.reduce(
                    (acc: number, item: any) => acc + item.quantity,
                    0
                  )}{" "}
                  items)
                </span>
                <span className="font-medium text-pink-950 text-pink-950">
                  ৳{order.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping Mode</span>
                <span className="font-medium text-pink-950 text-pink-950 capitalize">
                  {order.paymentMethod.replace(/_/g, " ")}
                </span>
              </div>
              <div className="pt-3 border-t border-pink-100  flex justify-between items-center">
                <span className="font-bold text-pink-950 text-pink-950">
                  Total
                </span>
                <span className="text-xl font-black text-[#7c0a43]">
                  ৳{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Order Meta */}
          <div className="bg-pink-50 /50 rounded-2xl p-4 border border-pink-100 ">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Order ID</span>
              <span className="font-mono font-bold text-pink-900/80 dark:text-gray-300">
                #{order.orderId}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-medium">Placed On</span>
              <span className="font-medium text-pink-900/80 dark:text-gray-300">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}