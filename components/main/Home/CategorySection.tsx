import React from "react";
import CategoryCard from "../card/CategoryCard";
import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";

export default async function CategorySection() {
  await connectDB();
  const dbCategories = await Category.find().lean();

  const categories = dbCategories.map(c => ({
    id: c._id?.toString(),
    title: c.title,
    imageSrc: c.image || "/placeholder-image.jpg",
    href: `/category/${c.title.toLowerCase().replace(/\s+/g, '-')}`
  }));
  // Row 1 (শুরুতে "/" যোগ করা হয়েছে)
  const firstHalf = categories.slice(0, Math.ceil(categories.length / 2));
  const secondHalf = categories.slice(Math.ceil(categories.length / 2));

  return (
    <section className="w-full bg-[#FFF5F8] py-8 px-4 md:px-8 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 min-w-[1100px] lg:min-w-0">

        {/* Row 1 Grid */}
        <div className="grid grid-cols-9 gap-3 sm:gap-4 justify-items-center">
          {firstHalf.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.title}
              myImage={item.imageSrc} // সঠিক প্রপ নাম
              href={item.href}
            />
          ))}
        </div>

        {/* Row 2 Grid */}
        <div className="grid grid-cols-9 gap-3 sm:gap-4 justify-items-center">
          {secondHalf.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.title}
              myImage={item.imageSrc} // এখানেও myImage ফিক্স করা হয়েছে
              href={item.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
}