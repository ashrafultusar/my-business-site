import mongoose, { Document, Schema, models } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    category: string;
    sizes: string[];
    inStock: boolean;
    sku: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        oldPrice: { type: Number },
        category: { type: String, required: true },
        sizes: { type: [String], default: [] },
        inStock: { type: Boolean, default: true },
        sku: { type: String },
        images: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Product = models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
