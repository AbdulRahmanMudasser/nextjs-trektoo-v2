import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
import Footer from '@/components/layout/Footer/Footer';
import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrowseTypes />
      <AdventureTours />
      <Footer />
    </main>
  );
}
