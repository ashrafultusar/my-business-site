import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import mongoose from "mongoose";


export async function getProductById(id: string) {
  try {
    await connectDB();

    // আইডিটি মঙ্গোডিবি'র ভ্যালিড অবজেক্ট আইডি কিনা চেক করা
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid Product ID format:", id);
      return null;
    }

    // .lean() ব্যবহার করা হয়েছে পারফরম্যান্স বুস্ট এবং প্লেইন অবজেক্ট রিটার্ন করার জন্য
    const product = await Product.findById(id).lean();

    if (!product) return null;

    // Next.js Server to Client কম্পোনেন্ট ডেটা পাসিং সেফ করার জন্য সিরিয়ালাইজেশন
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
    };
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    return null;
  }
}

/**
 * ২. সব প্রোডাক্ট একসাথে গেট করা (All Products Dashboard বা শপ পেজের জন্য)
 */
export async function getAllProducts() {
  try {
    await connectDB();
    
    // নতুন প্রোডাক্টগুলো আগে দেখানোর জন্য sort করা হয়েছে
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    
    return products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    return [];
  }
}