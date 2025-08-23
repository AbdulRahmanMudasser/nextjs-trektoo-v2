import React from 'react';
import AttractionsHero from '@/components/feature/AttractionsSection/AttractionsHero';
import AttractionsSearch from '@/components/feature/AttractionsSection/AttractionsSearch';
import AttractionsCategories from '@/components/feature/AttractionsSection/AttractionsCategories';
import FeaturedAttractions from '@/components/feature/AttractionsSection/FeaturedAttractions';
import AttractionsBenefits from '@/components/feature/AttractionsSection/AttractionsBenefits';

export default function AttractionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <AttractionsHero />
      <AttractionsSearch />
      <AttractionsCategories />
      <FeaturedAttractions />
      <AttractionsBenefits />
    </main>
  );
}
