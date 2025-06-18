import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrowseTypes />
    </main>
  );
}
