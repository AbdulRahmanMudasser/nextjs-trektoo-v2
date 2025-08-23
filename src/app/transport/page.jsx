import React from 'react';
import TransportHero from '@/components/feature/TransportSection/TransportHero';
import TransportSearch from '@/components/feature/TransportSection/TransportSearch';
import TransportTypes from '@/components/feature/TransportSection/TransportTypes';
import FeaturedTransport from '@/components/feature/TransportSection/FeaturedTransport';
import TransportFeatures from '@/components/feature/TransportSection/TransportFeatures';

export default function TransportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <TransportHero />
      <TransportSearch />
      <TransportTypes />
      <FeaturedTransport />
      <TransportFeatures />
    </main>
  );
}
