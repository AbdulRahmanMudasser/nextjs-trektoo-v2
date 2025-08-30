import React from 'react';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
// import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
// import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';
import GoWildSection from '@/components/feature/GoWildSection/GoWildSection';
import WhoWeAreSection from '@/components/feature/WhoWeAreSection/WhoWeAre';
import AdventureVideoSection from '@/components/feature/QASection/QA';
import FAQ from '@/components/feature/FAQSection/FAQ';
import Tour from '@/components/feature/TourSection/Tour';
import WhyChooseUs from '@/components/feature/WhyChooseUsSection/WhyChooseUs';
// import TravelGallerySection from '@/components/feature/TravelGallerySection/TravelGallery';

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      {/* <BrowseTypes /> */}
      {/* <AdventureTours /> */}
      <GoWildSection />
      <WhoWeAreSection />
      
      {/* Connecting Visual Element */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
      </div>
      
      <AdventureVideoSection />
      
      {/* Connecting Visual Element */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
      </div>
      
      <FAQ />
      
      {/* Connecting Visual Element */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
      </div>
      
      <WhyChooseUs />
      
      {/* Connecting Visual Element */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
      </div>
      
      {/* <TravelGallerySection /> */}
    </main>
  );
}