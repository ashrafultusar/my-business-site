"use server";

import { connectDB } from "@/db/dbConfig";
import Order from "@/models/Order";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";

export async function placeOrder(formData: FormData) {
    try {
        await connectDB();

        const customerName = formData.get("customerName") as string;
        const customerPhone = formData.get("customerPhone") as string;
        const address = formData.get("address") as string;
        const itemsStr = formData.get("items") as string;
        const totalAmountStr = formData.get("totalAmount") as string;

        if (!customerName || !customerPhone || !address || !itemsStr || !totalAmountStr) {
            return {
                success: false,
                message: "Missing required fields.",
            };
        }

        const items = JSON.parse(itemsStr);
        const totalAmount = parseFloat(totalAmountStr);

        // Generate a random, simple 6 chars uppercase alphanumeric Order ID
        const orderId = randomBytes(3).toString("hex").toUpperCase();

        const newOrder = new Order({
            customerName,
            customerPhone,
            address,
            items,
            totalAmount,
            orderId,
            status: "pending",
            paymentMethod: "cash_on_delivery",
        });

        await newOrder.save();

        revalidatePath("/");

        return {
            success: true,
            orderId,
            message: "Order placed successfully!",
        };
    } catch (error) {
        console.error("Failed to place order:", error);
        return {
            success: false,
            message: "Failed to place order. Please try again later.",
        };
    }
}

export async function updateOrderStatus(id: string, status: string) {
    try {
        await connectDB();
        const order = await Order.findById(id);
        if (!order) {
            return { success: false, message: "Order not found" };
        }

        order.status = status;
        await order.save();

        revalidatePath("/my-dashboard/orders");
        revalidatePath(`/my-dashboard/orders/${id}`);

        return { success: true, message: "Order status updated successfully!" };
    } catch (error: any) {
        console.error("Failed to update order status:", error);
        return { success: false, message: error.message || "Update failed." };
    }
}
