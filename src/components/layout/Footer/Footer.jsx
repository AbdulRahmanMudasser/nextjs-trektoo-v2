'use client';

import React, { useState, useEffect } from 'react';
import {
  SupportBanner,
  CompanyInfo,
  PagesLinks,
  NewsletterForm,
  ContactInfo,
} from './components/FooterComponents';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== 'undefined' &&
      window.innerWidth <= 1024 &&
      window.innerWidth > 768
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* <SupportBanner /> */}
        <div
          className={`grid gap-6 mb-6 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'
          }`}
        >
          <CompanyInfo />
          <PagesLinks />
          <NewsletterForm />
          <ContactInfo />
        </div>
        <div className="border-t border-gray-600 pt-4 text-center text-xs text-gray-300">
          © 2025 Copyright by Trektoo. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
