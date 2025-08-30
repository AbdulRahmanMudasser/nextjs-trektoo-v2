// FooterComponents.js

import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon, ContactIcon } from './Icons';

const SupportBanner = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-lg mr-3">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">
              Need Support for Tours & Travels?
            </h4>
            <p className="text-sm text-gray-300">
              Our travel experts are here to help you plan the perfect trip
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-white mr-3 font-medium">
            Ready to Start Your Adventure?
          </span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

const CompanyInfo = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 p-2 rounded-lg mr-3">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Trektoo</h3>
      </div>
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        Trek Too is a brand of TREK TOO LTD. Registered in England & Wales No. 15766570. 
        We specialize in creating unforgettable travel experiences worldwide.
      </p>
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-300">
          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Trusted by 10K+ travelers
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          50+ destinations covered
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          24/7 customer support
        </div>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-blue-500 mb-3 font-medium">Follow us on social media</p>
        <div className="flex gap-3">
          <SocialIcon type="facebook" />
          <SocialIcon type="instagram" />
          <SocialIcon type="tiktok" />
        </div>
      </div>
    </div>
  );
};

const PagesLinks = () => {
  const links = [
    { label: 'About us', href: '/about', icon: 'info' },
    { label: 'Contact us', href: '/contact', icon: 'contact' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions', icon: 'document' },
    { label: 'Privacy Policy', href: '/privacy-policy', icon: 'shield' },
  ];

  const getIcon = (iconType) => {
    const icons = {
      info: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      contact: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      document: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      shield: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    };
    return icons[iconType] || icons.info;
  };

  return (
    <div className="flex-1">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 p-2 rounded-lg mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Quick Links</h3>
      </div>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="flex items-center text-sm text-gray-300 no-underline hover:text-blue-500 transition-all duration-300 hover:translate-x-1 group"
            >
              <span className="text-blue-500 mr-3 group-hover:scale-110 transition-transform duration-200">
                {getIcon(link.icon)}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
};

const NewsletterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submission logic
  };

  return (
    <div className="flex-1">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 p-2 rounded-lg mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Stay Updated</h3>
      </div>
      
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        Get exclusive travel deals, destination guides, and insider tips delivered straight to your inbox. Join thousands of travelers who never miss an adventure!
      </p>
      
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-4"
      >
        <div className="relative">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          aria-label="Subscribe to newsletter"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Subscribe Now
        </button>
      </form>
      
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          id="newsletter-terms"
          className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
          required
        />
        <label
          htmlFor="newsletter-terms"
          className="text-xs text-gray-400 leading-relaxed"
        >
          I agree to receive marketing emails and accept the{' '}
          <a
            href="/terms"
            className="text-blue-500 hover:text-blue-400 underline font-medium"
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a
            href="/privacy"
            className="text-blue-500 hover:text-blue-400 underline font-medium"
          >
            Privacy Policy
          </a>
        </label>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center text-xs text-gray-400">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Unsubscribe anytime • No spam, ever
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  const contacts = [
    { 
      type: 'phone', 
      value: '0155 829 8719', 
      href: '/contact',
      icon: 'phone'
    },
    {
      type: 'email',
      value: 'support@trek-too.com',
      href: 'mailto:support@trek-too.com',
      icon: 'email'
    },
    {
      type: 'address',
      value: '24-26 Arcadia Avenue, London, United Kingdom',
      href: '/contact',
      icon: 'location'
    },
  ];

  const getIcon = (iconType) => {
    const icons = {
      phone: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      email: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      location: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    };
    return icons[iconType] || icons.phone;
  };

  return (
    <div className="flex-1">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 p-2 rounded-lg mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Get In Touch</h3>
      </div>
      <ul className="space-y-3">
        {contacts.map((contact, index) => (
          <li key={index}>
            <a
              href={contact.href}
              className="flex items-center text-sm text-gray-300 no-underline hover:text-blue-500 transition-all duration-300 hover:translate-x-1 group"
            >
              <span className="text-blue-500 mr-3 group-hover:scale-110 transition-transform duration-200">
                {getIcon(contact.icon)}
              </span>
              {contact.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SupportBanner, CompanyInfo, PagesLinks, NewsletterForm, ContactInfo };
