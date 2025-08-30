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
    <footer className="bg-gray-900 text-white">
      {/* Support Banner - Full Width */}
      <div className="w-full bg-blue-500/20 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SupportBanner />
        </div>
      </div>
      
      {/* Main Footer Content - Full Width */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Top Row - Company Info and Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CompanyInfo />
            <NewsletterForm />
          </div>
          
          {/* Bottom Row - Quick Links and Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PagesLinks />
            <ContactInfo />
          </div>
        </div>
      </div>
      
      {/* Copyright - Full Width */}
      <div className="w-full border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-300">
            © 2025 Copyright by Trektoo. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
