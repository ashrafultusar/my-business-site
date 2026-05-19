"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/order";

const STATUSES = [
    { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200" },
    { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { value: "shipped", label: "Shipped", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-700 border-green-200" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-700 border-red-200" }
];

export default function StatusUpdater({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(currentStatus);

    const handleUpdate = async (newStatus: string) => {
        setLoading(true);
        try {
            const res = await updateOrderStatus(orderId, newStatus);
            if (res.success) {
                setStatus(newStatus);
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                    <button
                        key={s.value}
                        disabled={loading}
                        onClick={() => handleUpdate(s.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${status === s.value
                                ? `${s.color} ring-2 ring-offset-1 ring-${s.color.split(' ')[1].split('-')[1]}-400`
                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 disabled:opacity-50'
                            }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
            {loading && <p className="text-xs text-gray-400 animate-pulse font-medium">Updating status...</p>}
        </div>
    );
}
