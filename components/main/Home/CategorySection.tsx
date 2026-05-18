import React from "react";
import CategoryCard from "../card/CategoryCard";

interface CategoryItem {
  id: number;
  title: string;
  imageSrc: string;
  href: string;
}

export default function CategorySection() {
  const categories: CategoryItem[] = [
    // Row 1 (শুরুতে "/" যোগ করা হয়েছে)
    { id: 1, title: "Women Fashion", imageSrc: "/assets/image.jpg", href: "/categories/women-fashion" },
    { id: 2, title: "Women Bottom", imageSrc: "/assets/image.jpg", href: "/categories/women-bottom" },
    { id: 3, title: "Men Topwear", imageSrc: "/assets/image.jpg", href: "/categories/men-topwear" },
    { id: 4, title: "Women Footwear", imageSrc: "/assets/image.jpg", href: "/categories/women-footwear" },
    { id: 5, title: "Men Bottomwear", imageSrc: "/assets/image.jpg", href: "/categories/men-bottomwear" },
    { id: 6, title: "Men Fashion Access...", imageSrc: "/assets/image.jpg", href: "/categories/men-accessories" },
    { id: 7, title: "Men Footwear", imageSrc: "/assets/image.jpg", href: "/categories/men-footwear" },
    { id: 8, title: "Women Accessories", imageSrc: "/assets/image.jpg", href: "/categories/women-accessories" },
    { id: 9, title: "Health & Beauty", imageSrc: "/assets/image.jpg", href: "/categories/health-beauty" },

    // Row 2 (সম্পূর্ণ ৯টি কার্ডের ডেটা পূর্ণ করা হলো)
    { id: 10, title: "Kids Kurti", imageSrc: "/assets/image.jpg", href: "/categories/kids-kurti" },
    { id: 11, title: "Kids Girls Clothing", imageSrc: "/assets/image.jpg", href: "/categories/girls-clothing" },
    { id: 12, title: "Kids Boys Clothing", imageSrc: "/assets/image.jpg", href: "/categories/boys-clothing" },
    { id: 13, title: "Kids Accessories", imageSrc: "/assets/image.jpg", href: "/categories/kids-accessories" },
    { id: 14, title: "Kids Footwear", imageSrc: "/assets/image.jpg", href: "/categories/kids-footwear" },
    { id: 15, title: "Baby Clothing Set", imageSrc: "/assets/image.jpg", href: "/categories/baby-clothing" },
    { id: 16, title: "Baby Shoes", imageSrc: "/assets/image.jpg", href: "/categories/baby-shoes" },
    { id: 17, title: "Baby Accessories", imageSrc: "/assets/image.jpg", href: "/categories/baby-accessories" },
    { id: 18, title: "Baby Winter Wear", imageSrc: "/assets/image.jpg", href: "/categories/baby-winter" },
  ];

  return (
    <section className="w-full bg-[#FFF5F8] py-8 px-4 md:px-8 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 min-w-[1100px] lg:min-w-0">
        
        {/* Row 1 Grid */}
        <div className="grid grid-cols-9 gap-3 sm:gap-4 justify-items-center">
          {categories.slice(0, 9).map((item) => (
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
          {categories.slice(9, 18).map((item) => (
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