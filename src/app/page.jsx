import React from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
import Footer from '@/components/layout/Footer/Footer';
import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';
import GoWildSection from '@/components/feature/GoWildSection/GoWildSection';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrowseTypes />
      <AdventureTours />
      <GoWildSection />
      <Footer />
    </main>
  );
}
