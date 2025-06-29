import { Suspense } from 'react';
import HeaderSection from '@/components/feature/HotelsList/HeaderSection';
import HotelListContent from '@/components/feature/HotelsList/HotelListContent';

export default function HotelsList() {
  return (
    <>
      <HeaderSection />
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl my-12 border border-blue-50">
            <div className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
            <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
              Loading Hotels
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Please wait while we fetch the best accommodations...
            </p>
          </div>
        }
      >
        <HotelListContent />
      </Suspense>
    </>
  );
}
