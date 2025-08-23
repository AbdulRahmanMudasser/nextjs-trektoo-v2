import React from 'react';
import ToursHero from '@/components/feature/ToursSection/ToursHero';
import ToursCategories from '@/components/feature/ToursSection/ToursCategories';
import FeaturedTours from '@/components/feature/ToursSection/FeaturedTours';
import ToursTestimonials from '@/components/feature/ToursSection/ToursTestimonials';

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <ToursHero />
      <ToursCategories />
      <FeaturedTours />
      <ToursTestimonials />
    </main>
  );
}
