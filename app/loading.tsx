import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm min-h-screen">
            <div className="relative flex flex-col items-center">
                {/* Outer Ring */}
                <div className="w-20 h-20 border-4 border-gray-100 border-t-[#7c0a43] border-r-[#7c0a43] rounded-full animate-spin"></div>

                {/* Inner Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#C11767] rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Text */}
                <h2 className="mt-8 text-xl font-black text-gray-900 tracking-widest uppercase drop-shadow-sm animate-pulse">
                    Loading
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-2">
                    Curating premium collections for you...
                </p>
            </div>
        </div>
    );
}