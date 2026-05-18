"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SlideData {
  id: string;
  category: string;
  subtitle: string;
  title: string;
  bgColor: string;
  accentColor: string;
  imageMock: string;
}

const slideData: SlideData[] = [
  {
    id: "streetwear",
    category: "STREETWEAR",
    subtitle: "UNIQUE STYLE. LIMITLESS POSSIBILITIES.",
    title: "ELEVATE YOUR VIBE",
    bgColor: "from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]",
    accentColor: "#D11A6E",
    imageMock: "🧬", 
  },
  {
    id: "premium",
    category: "PREMIUM",
    subtitle: "NEXT GENERATION LUXURY LUXE.",
    title: "FUTURE FASHION NOW",
    bgColor: "from-[#1a0933] via-[#2d124d] to-[#1a0933]",
    accentColor: "#a855f7",
    imageMock: "🔮",
  },
  {
    id: "accessories",
    category: "ACCESSORIES",
    subtitle: "CYBERPUNK TECHWEAR GEARS.",
    title: "UPGRADE YOUR LOOK",
    bgColor: "from-[#062c2d] via-[#0b4f51] to-[#062c2d]",
    accentColor: "#06b6d4",
    imageMock: "🕶️",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
  };

  const handleTabClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const currentSlide = slideData[currentIndex];

  return (
    <div className="w-full bg-[#0a0f1d] py-4 md:py-6 px-3 sm:px-4 md:px-8 select-none overflow-hidden relative">
      
      {/* 📱 Responsively Sized Main Viewport Box */}
      {/* মোবাইলে হাইট ২০০px, ট্যাবলেটে ৩০০px এবং পিসিতে ৪০০px করা হয়েছে */}
      <div className={`relative max-w-7xl mx-auto h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-gradient-to-r ${currentSlide.bgColor} border border-white/10 shadow-2xl flex items-center`}>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 rounded-full filter blur-[80px] sm:blur-[120px] opacity-30 transition-all duration-1000 pointer-events-none"
          style={{ backgroundColor: currentSlide.accentColor }}
        />

        <div className="w-full h-full relative px-4 sm:px-10 md:px-16 flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-12 gap-2 sm:gap-6 items-center z-10"
            >
              {/* Left Content Side */}
              <div className="col-span-7 sm:col-span-8 lg:col-span-7 flex flex-col justify-center">
                <h1 className="text-xl sm:text-4xl md:text-6xl font-black tracking-tight text-white">
                  My Shop
                </h1>
                
                <p className="text-[7px] sm:text-xs font-bold tracking-[0.15em] mt-1 sm:mt-3 text-white/60 uppercase line-clamp-1">
                  {currentSlide.subtitle}
                </p>
                
                <h2 className="text-xs sm:text-xl md:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 line-clamp-1">
                  {currentSlide.title}
                </h2>

                {/* Scaled Responsive Buttons */}
                <div className="flex items-center gap-2 mt-2 sm:mt-6 md:mt-8">
                  <Link 
                    href={`/shop/${currentSlide.id}`}
                    className="flex items-center gap-1 sm:gap-2 bg-white text-black font-black text-[8px] sm:text-xs md:text-sm px-2.5 py-1.5 sm:px-5 sm:py-3 rounded-full hover:opacity-90 transition-all"
                  >
                    DISCOVER
                  </Link>
                  <Link 
                    href={`/shop/${currentSlide.id}`}
                    className="hidden sm:inline-block border border-white/30 backdrop-blur-md text-white font-bold text-[8px] sm:text-xs md:text-sm px-4 py-3 rounded-full hover:bg-white/10 transition-all"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>

              {/* Right Side Image Space: Visible on ALL Devices now */}
              <div className="col-span-5 sm:col-span-4 lg:col-span-5 flex items-center justify-center relative">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-xl sm:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-2xl sm:text-6xl md:text-8xl shadow-xl relative"
                >
                  {/* বাস্তব প্রোজেক্টে এই স্পেসটিতে আপনার <Image /> কম্পোনেন্ট বসাবেন */}
                  <span>{currentSlide.imageMock}</span>
                  
                  {/* Mini floating logo dot */}
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-10 sm:h-10 bg-[#D11A6E] rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold text-white shadow-md">
                    M
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scaled Nav Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 text-white transition-all focus:outline-none"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 text-white transition-all focus:outline-none"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Responsive Bottom Capsule Tabs */}
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 mt-4 sm:mt-6">
        {slideData.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => handleTabClick(idx)}
              className={`flex-1 py-1.5 sm:py-3 px-2 rounded-full text-center text-[9px] sm:text-xs font-black tracking-wider transition-all duration-300 focus:outline-none uppercase ${
                isActive 
                  ? "bg-white text-black shadow-md ring-1 ring-[#D11A6E]" 
                  : "bg-[#182235] text-white/50 border border-white/5"
              }`}
            >
              {slide.category}
            </button>
          );
        })}
      </div>

    </div>
  );
}