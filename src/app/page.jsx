import React from 'react';
import Navbar from '../components/layout/Navbar';

// Main page component
export default function HomePage() {
  return (
    <main>
      <Navbar />
      {/* Placeholder for page content */}
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Trektoo</h1>
      </section>
    </main>
  );
}
