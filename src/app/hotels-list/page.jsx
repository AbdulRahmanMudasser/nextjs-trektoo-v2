import React from 'react';
import HeaderSection from '@/components/feature/HotelsList/HeaderSection';
import HotelListContent from '@/components/feature/HotelsList/HotelListContent';

export default function HotelsList() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <HeaderSection />

      {/* Main Content */}
      <section className="relative w-full py-8 sm:py-12">
        <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
          <HotelListContent />
        </div>
      </section>
    </main>
  );
}
