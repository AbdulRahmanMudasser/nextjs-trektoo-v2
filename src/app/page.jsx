import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/feature/HeroSection/HeroSection';
// import GoWildSection from '@/components/feature/GoWildSection/GoWildSection';
import AdventureVideoSection from '@/components/feature/QASection/QA';
import FAQ from '@/components/feature/FAQSection/FAQ';
// import Tour from '@/components/feature/TourSection/Tour';
import WhyChooseUs from '@/components/feature/WhyChooseUsSection/WhyChooseUs';
// import BrowseTypes from '@/components/feature/BrowseTypeSection/BrowseTypes';
// import AdventureTours from '@/components/feature/AdventureSection/AdventureTours';
// import TravelGallerySection from '@/components/feature/TravelGallerySection/TravelGallery';
// import WhoWeAreSection from '@/components/feature/WhoWeAreSection/WhoWeAre';
// import TransportSection from '@/components/feature/TransportSection/TransportSection';
// import CarRentalsSection from '@/components/feature/CarRentalsSection/CarRentalsSection';
// import AttractionsSection from '@/components/feature/AttractionsSection/AttractionsSection';
// import HotelsList from '@/components/feature/HotelsList/HotelsList';

// New sections we'll create
// import FeaturedDestinations from '@/components/feature/FeaturedDestinations/FeaturedDestinations';
import TestimonialsSection from '@/components/feature/TestimonialsSection/TestimonialsSection';
import StatsSection from '@/components/feature/StatsSection/StatsSection';
// import NewsletterSection from '@/components/feature/NewsletterSection/NewsletterSection';
// import PartnersSection from '@/components/feature/PartnersSection/PartnersSection';
// import TrendingDeals from '@/components/feature/TrendingDeals/TrendingDeals';
// import TravelTips from '@/components/feature/TravelTips/TravelTips';
// import MobileAppSection from '@/components/feature/MobileAppSection/MobileAppSection';


export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section - Already Enhanced */}
      <HeroSection />
      
      {/* Stats Section - Social Proof */}
      {/* <StatsSection /> */}
      
      {/* Browse Types - Service Categories */}
      {/* <BrowseTypes /> */}
      
      {/* Featured Destinations - Trending Places */}
      {/* <FeaturedDestinations /> */}
      
      {/* Go Wild Section - Adventure Activities */}
      {/* <GoWildSection /> */}
      
      {/* Adventure Tours - Curated Experiences */}
      {/* <AdventureTours /> */}
      
      {/* Trending Deals - Special Offers */}
      {/* <TrendingDeals /> */}
      
      {/* Adventure Video Section */}
      <AdventureVideoSection />
      
      {/* Why Choose Us - Trust & Benefits */}
      <WhyChooseUs />
      
      {/* Testimonials - Customer Reviews */}
      <TestimonialsSection />
      
      {/* Travel Gallery - Visual Inspiration */}
      {/* <TravelGallerySection /> */}
      
      {/* Who We Are - Company Story */}
      {/* <WhoWeAreSection /> */}
      
      {/* Transport Section - Getting Around */}
      {/* <TransportSection /> */}
      
      {/* Car Rentals - Freedom to Explore */}
      {/* <CarRentalsSection /> */}
      
      {/* Attractions - Must-See Places */}
      {/* <AttractionsSection /> */}
      
      {/* Tour Section - Guided Experiences */}
      {/* <Tour /> */}
      
      {/* Travel Tips - Expert Advice */}
      {/* <TravelTips /> */}
      
      {/* FAQ Section - Common Questions */}
      <FAQ />
      
      {/* Partners Section - Trusted Brands */}
      {/* <PartnersSection /> */}
      
      {/* Mobile App Section - Download CTA */}
      {/* <MobileAppSection /> */}
      
      {/* Newsletter Section - Stay Updated */}
      {/* <NewsletterSection /> */}
      
      
    </main>
  );
}