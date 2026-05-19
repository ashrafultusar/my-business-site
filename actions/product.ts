"use server";

import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    await connectDB();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const inStock = formData.get("inStock") === "true";
    const oldPriceStr = formData.get("oldPrice") as string;
    const oldPrice = oldPriceStr ? Number(oldPriceStr) : undefined;

    const sizesStr = formData.get("sizes") as string;
    const sizes = sizesStr ? sizesStr.split(",").map((s) => s.trim()) : [];

    // Handle multiple image uploads
    const files = formData.getAll("images") as File[];

    const uploadPromises = files.map((file) => {
      if (file.size > 0) return uploadImage(file, "ecommerce/products");
      return null;
    });

    // Filter out nulls where empty file might be submitted
    const uploadedUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null
    ) as string[];

    const product = new Product({
      title,
      description,
      price,
      oldPrice,
      category,
      inStock,
      sizes,
      images: uploadedUrls,
      sku: `SKU-${Date.now().toString().slice(-6)}`,
    });

    await product.save();
    revalidatePath("/my-dashboard/products");

    return { success: true, message: "Product added successfully!" };
  } catch (error: any) {
    console.error("Add Product Error:", error);
    return {
      success: false,
      message: error.message || "Failed to add product",
    };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectDB();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const inStock = formData.get("inStock") === "true";
    const oldPriceStr = formData.get("oldPrice") as string;
    const oldPrice = oldPriceStr ? Number(oldPriceStr) : undefined;

    const sizesStr = formData.get("sizes") as string;
    const sizes = sizesStr ? sizesStr.split(",").map((s) => s.trim()) : [];

    // Fetch existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return { success: false, message: "Product not found" };
    }

    // Handle existing images kept or removed
    let uploadedUrls: string[] = [];
    const keptImagesStr = formData.get("keptImages") as string;
    if (keptImagesStr) {
      uploadedUrls = JSON.parse(keptImagesStr);
    } else {
      // Backwards compatible fallback
      uploadedUrls = existingProduct.images;
    }

    // Handle new multiple image uploads if they exist
    const files = formData.getAll("images") as File[];
    const validFiles = files.filter((f) => f.size > 0);

    if (validFiles.length > 0) {
      const uploadPromises = validFiles.map((file) =>
        uploadImage(file, "ecommerce/products")
      );
      const newUrls = await Promise.all(uploadPromises);
      uploadedUrls = [...uploadedUrls, ...newUrls]; // Or replace entirely based on needs
    }

    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.oldPrice = oldPrice;
    existingProduct.category = category;
    existingProduct.inStock = inStock;
    existingProduct.sizes = sizes;
    existingProduct.images = uploadedUrls;

    await existingProduct.save();
    revalidatePath("/my-dashboard/products");

    return { success: true, message: "Product updated successfully!" };
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return {
      success: false,
      message: error.message || "Failed to update product",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);

    revalidatePath("/my-dashboard/products");
    return { success: true, message: "Product deleted successfully!" };
  } catch (error: any) {
    console.error("Delete Product Error:", error);
    return {
      success: false,
      message: error.message || "Failed to delete product",
    };
  }
}
