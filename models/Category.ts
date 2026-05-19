import mongoose, { Document, Schema, models } from "mongoose";

export interface ICategory extends Document {
    title: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
    },
    { timestamps: true }
);

const Category = models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
