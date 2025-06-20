import React from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
import Footer from '@/components/layout/Footer/Footer';
import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';
import GoWildSection from '@/components/feature/GoWildSection/GoWildSection';
import WhoWeAreSection from '@/components/feature/WhoWeAreSection/WhoWeAre';
import QA from '@/components/feature/QASection/QA';
import Tour from '@/components/feature/TourSection/Tour';
import WhyChooseUs from '@/components/feature/WhyChooseUsSection/WhyChooseUs';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrowseTypes />
      <AdventureTours />
      <GoWildSection />
      <WhoWeAreSection />
      <QA />
      <Tour />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
