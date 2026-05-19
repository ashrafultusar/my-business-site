import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';
import { connectDB } from '@/db/dbConfig';
import Category from '@/models/Category';

// TypeScript-এর জন্য children-এর টাইপ ডিফাইন করা হলো
interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  // Fetch categories from the database
  await connectDB();
  const dbCategories = await Category.find({}).lean();

  // Serialize for passing to Client Component
  const categories = dbCategories.map(cat => ({
    _id: cat._id.toString(),
    title: cat.title,
    slug: cat.title.toLowerCase()
  }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Common Navbar */}
      <Navbar categories={categories} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
}