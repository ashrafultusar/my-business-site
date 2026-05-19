"use server";

import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
    try {
        await connectDB();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        // Handle optional single image upload
        const file = formData.get("image") as File;
        let imageUrl = "";

        if (file && file.size > 0) {
            const url = await uploadImage(file, "ecommerce/categories");
            if (url) imageUrl = url;
        }

        const category = new Category({
            title,
            description,
            image: imageUrl,
        });

        await category.save();
        revalidatePath("/my-dashboard/categories");

        return { success: true, message: "Category added successfully!" };
    } catch (error: any) {
        console.error("Add Category Error:", error);
        return {
            success: false,
            message: error.message || "Failed to add category",
        };
    }
}

export async function updateCategory(id: string, formData: FormData) {
    try {
        await connectDB();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const keptImage = formData.get("keptImage") as string;

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return { success: false, message: "Category not found" };
        }

        let imageUrl = keptImage || "";

        // If there is a new image
        const file = formData.get("image") as File;
        if (file && file.size > 0) {
            const newUrl = await uploadImage(file, "ecommerce/categories");
            if (newUrl) imageUrl = newUrl;
        }

        existingCategory.title = title;
        existingCategory.description = description;
        existingCategory.image = imageUrl;

        await existingCategory.save();
        revalidatePath("/my-dashboard/categories");

        return { success: true, message: "Category updated successfully!" };
    } catch (error: any) {
        console.error("Update Category Error:", error);
        return {
            success: false,
            message: error.message || "Failed to update category",
        };
    }
}

export async function deleteCategory(id: string) {
    try {
        await connectDB();
        await Category.findByIdAndDelete(id);

        revalidatePath("/my-dashboard/categories");
        return { success: true, message: "Category deleted successfully!" };
    } catch (error: any) {
        console.error("Delete Category Error:", error);
        return {
            success: false,
            message: error.message || "Failed to delete category",
        };
    }
}
