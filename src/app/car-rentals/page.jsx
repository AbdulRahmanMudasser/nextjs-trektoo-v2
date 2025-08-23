import React from 'react';
import CarRentalsHero from '@/components/feature/CarRentalsSection/CarRentalsHero';
// import CarRentalsSearch from '@/components/feature/CarRentalsSection/CarRentalsSearch';
import CarCategories from '@/components/feature/CarRentalsSection/CarCategories';
import FeaturedCars from '@/components/feature/CarRentalsSection/FeaturedCars';
import CarRentalsBenefits from '@/components/feature/CarRentalsSection/CarRentalsBenefits';

export default function CarRentalsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <CarRentalsHero />
      {/* <CarRentalsSearch /> */}
      <CarCategories />
      <FeaturedCars />
      <CarRentalsBenefits />
    </main>
  );
}
