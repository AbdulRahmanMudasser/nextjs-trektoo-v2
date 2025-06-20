import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const ProgressCircle = ({ percentage, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(#3b82f6 ${percentage}%, #E5E7EB ${percentage}%)`,
      }}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-base font-medium text-[#1E2A44]">
        {percentage}%
      </div>
    </div>
    <span className="text-sm font-medium text-[#1E2A44]">{label}</span>
  </div>
);

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const HalfRoundedImage = () => (
  <Image
    src="/images/who-we-are.png"
    alt="Selfie outdoor camping"
    width={800}
    height={550}
    className="rounded-xl object-cover"
  />
);

const WhoWeAreSection = () => (
  <div className="py-12 bg-[#F7F9FF]">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
      {/* Left Image */}
      <div className="flex-1">
        <HalfRoundedImage />
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {/* WhoWeAreBadge */}
        <p className="text-sm text-white mb-4 font-medium bg-blue-500 inline-block px-3 py-1 rounded-lg">
          Who We Are
        </p>

        {/* SectionHeading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-4 leading-tight">
          Great opportunity for adventure & travels
        </h1>

        {/* DescriptionText */}
        <p className="text-base text-[#6b7280] mb-8 leading-relaxed">
          As a trusted travel agency and hotel booking partner, we specialize in
          seamless journey planning, curated tours, and top-rated accommodations
          worldwide. Whether you're chasing adventure or relaxation, we make
          travel easy, personalized, and memorable from the first click to your
          final destination.
        </p>

        {/* ProgressStats */}
        <div className="flex bg-white rounded-xl p-8 shadow-lg gap-12 items-center justify-center max-w-xl mt-8">
          <ProgressCircle percentage={50} label="Satisfied Clients" />
          <div className="w-0.5 bg-[#1E2A44] h-24" />
          <ProgressCircle percentage={50} label="Success Rate" />
        </div>
      </div>
    </div>
  </div>
);

WhoWeAreSection.propTypes = {};

export default WhoWeAreSection;
