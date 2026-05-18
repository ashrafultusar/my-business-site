import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

// TypeScript-এর জন্য children-এর টাইপ ডিফাইন করা হলো
interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Common Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
}