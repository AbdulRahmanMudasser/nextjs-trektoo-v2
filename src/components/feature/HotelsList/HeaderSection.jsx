'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = React.useState(false);
  const proxiedSrc = src.includes('staging.trektoo.com')
    ? `/api/image/proxy?url=${encodeURIComponent(src)}`
    : src;

  return (
    <div className="relative w-full h-full">
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
          <div className="h-10 w-10 text-blue-500 animate-spin" />
          <span className="text-gray-600 text-sm font-medium mt-2">
            Image Unavailable
          </span>
        </div>
      ) : (
        <Image
          src={proxiedSrc}
          alt={alt}
          onError={(e) => {
            console.error('Image load error:', { src, error: e.message });
            setHasError(true);
          }}
          {...props}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const HeaderSubtitle = ({ children }) => (
  <p className="mt-3 text-lg md:text-xl text-gray-200 font-medium max-w-3xl mx-auto">
    {children}
  </p>
);

HeaderSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderTitle = ({ children }) => (
  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
    {children}
  </h1>
);

HeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="flex flex-col items-center text-center"
  >
    <HeaderTitle>Discover Your Next Stay</HeaderTitle>
    <HeaderSubtitle>Find the perfect hotel for your journey</HeaderSubtitle>
  </motion.div>
);

const HeaderSection = () => (
  <section className="relative w-full h-[500px] flex items-center justify-center">
    <ImageWithFallback
      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      alt="Hotel hero"
      fill
      sizes="100vw"
      className="object-cover"
      quality={80}
      priority
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <HeaderContent />
    </div>
  </section>
);

export default HeaderSection;
