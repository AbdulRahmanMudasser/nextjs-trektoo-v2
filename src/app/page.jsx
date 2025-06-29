import React from 'react';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';
import GoWildSection from '@/components/feature/GoWildSection/GoWildSection';
import WhoWeAreSection from '@/components/feature/WhoWeAreSection/WhoWeAre';
import QA from '@/components/feature/QASection/QA';
import Tour from '@/components/feature/TourSection/Tour';
import WhyChooseUs from '@/components/feature/WhyChooseUsSection/WhyChooseUs';
import TravelGallerySection from '@/components/feature/TravelGallerySection/TravelGallery';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrowseTypes />
      <AdventureTours />
      <GoWildSection />
      <WhoWeAreSection />
      <QA />
      <Tour />
      <WhyChooseUs />
      <TravelGallerySection />
    </main>
  );
}
