'use client';

import React from 'react';
import {
  SupportBanner,
  CompanyInfo,
  PagesLinks,
  NewsletterForm,
  ContactInfo,
} from './components/FooterComponents';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* <SupportBanner /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
