import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  myImage: string;
  href: string;
}

export default function CategoryCard({ title, myImage, href }: CategoryCardProps) {
  return (
    <Link 
      href={href} 
      className="flex flex-col items-center group cursor-pointer select-none"
    >
      {/* Image Box */}
      <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] bg-gradient-to-b from-[#E3F2FD] to-[#F1F8FF] rounded-xl overflow-hidden shadow-sm border border-blue-50/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
        <Image
          src={myImage}
          alt={title}
          width={120}
          height={120}
          className="object-contain p-1.5 w-full h-full transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Title */}
      <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 text-center line-clamp-2 max-w-[110px] sm:max-w-[130px] tracking-tight group-hover:text-[#D11A6E] transition-colors">
        {title}
      </span>
    </Link>
  );
}