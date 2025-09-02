'use client';

import React from 'react';

const HeaderSection = () => (
  <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-blue-600">
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Your Next Stay
        </h1>
        <p className="text-xl md:text-2xl">
          Find the perfect hotel for your journey
        </p>
      </div>
    </div>
  </section>
);

export default HeaderSection;
