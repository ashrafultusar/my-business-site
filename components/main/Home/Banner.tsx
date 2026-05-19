'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/all?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative w-full h-[380px] md:h-[420px] bg-[#C11767] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* City Silhouette Background Layer */}
      <div
        className="absolute inset-0 opacity-15 bg-bottom bg-repeat-x pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400' width='1200' height='400'%3E%3Cpath d='M0,400 L0,280 L40,280 L40,250 L90,250 L90,310 L130,310 L130,180 L180,180 L180,220 L220,220 L220,150 L280,150 L280,290 L320,290 L320,210 L380,210 L380,110 L440,110 L440,260 L490,260 L490,190 L550,190 L550,320 L600,320 L600,130 L660,130 L660,240 L710,240 L710,170 L780,170 L780,280 L830,280 L830,140 L890,140 L890,220 L940,220 L940,100 L1000,100 L1000,270 L1060,270 L1060,195 L1120,195 L1120,310 L1200,310 L1200,400 Z' fill='%23000000'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">

        {/* Subtitle */}
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-medium tracking-wide mb-2 drop-shadow-sm">
          Bangladesh’s Favorite Online
        </h2>

        {/* Main Title */}
        <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-10 drop-shadow-md">
          Shoping Mall
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl bg-white rounded-full p-2 flex items-center shadow-lg transition-all focus-within:ring-4 focus-within:ring-pink-400/50">
          <div className="pl-4 pr-3 text-gray-400 flex items-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-3 px-2 text-gray-800 text-base md:text-lg placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#D11A6E] text-white font-bold text-sm md:text-lg px-6 md:px-8 py-3 rounded-full hover:bg-[#b01258] active:scale-95 transition-all shadow-md shrink-0"
          >
            Search
          </button>
        </form>

      </div>
    </div>
  );
}