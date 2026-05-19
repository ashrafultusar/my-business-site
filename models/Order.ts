import mongoose, { Document, Schema, models } from "mongoose";

export interface IOrderItem {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
}

export interface IOrder extends Document {
    customerName: string;
    customerPhone: string;
    address: string;
    items: IOrderItem[];
    totalAmount: number;
    status: string;
    paymentMethod: string;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, default: "M" },
    image: { type: String },
});

const OrderSchema = new Schema<IOrder>(
    {
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: true },
        address: { type: String, required: true },
        items: [OrderItemSchema],
        totalAmount: { type: Number, required: true },
        status: { type: String, default: "pending" },
        paymentMethod: { type: String, default: "cash_on_delivery" },
        orderId: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Order = models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
