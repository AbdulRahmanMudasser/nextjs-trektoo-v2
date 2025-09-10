import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load components for better performance
const HeroSection = lazy(
  () => import('@/components/feature/HeroSection/HeroSection')
);
const AdventureVideoSection = lazy(
  () => import('@/components/feature/QASection/QA')
);
const FAQ = lazy(() => import('@/components/feature/FAQSection/FAQ'));
const WhyChooseUs = lazy(
  () => import('@/components/feature/WhyChooseUsSection/WhyChooseUs')
);
const TestimonialsSection = lazy(
  () => import('@/components/feature/TestimonialsSection/TestimonialsSection')
);

// Loading component for suspense fallback
const ComponentLoader = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-white text-lg">Loading...</div>
  </div>
);

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section - Critical above the fold */}
      <Suspense fallback={<ComponentLoader />}>
        <HeroSection />
      </Suspense>

      {/* Adventure Video Section */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <AdventureVideoSection />
      </Suspense>

      {/* Why Choose Us - Trust & Benefits */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>

      {/* Testimonials - Customer Reviews */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <TestimonialsSection />
      </Suspense>

      {/* FAQ Section - Common Questions */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <FAQ />
      </Suspense>
    </main>
  );
}
