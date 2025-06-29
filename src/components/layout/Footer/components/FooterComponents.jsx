// FooterComponents.js

import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon, ContactIcon } from './Icons';

const SupportBanner = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-600 mb-6 gap-3 sm:gap-0">
      <div className="flex items-center">
        <svg
          className="w-4 h-4 text-indigo-200 mr-2"
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
        <span className="text-sm text-white">
          Need any support for tour & travels?
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-white mr-2">
          Ready to Get Started With Vacations!
        </span>
        <svg
          className="w-4 h-4 text-indigo-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

const CompanyInfo = () => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <h3 className="text-xl font-bold text-white">Trektoo</h3>
      </div>
      <p className="text-sm text-gray-300 mb-3">
        Trek Too is a brand of TREK TOO LTD. Registered in England & Wales No.
        15766570
      </p>
      <div className="flex flex-wrap gap-2">
        <SocialIcon type="twitter" />
        <SocialIcon type="facebook" />
        <SocialIcon type="instagram" />
        <SocialIcon type="linkedin" />
      </div>
    </div>
  );
};

const PagesLinks = () => {
  const links = [
    { label: 'About us', href: '/about-us' },
    { label: 'Community Blog', href: '/blog' },
    { label: 'Work with Us', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Contact us', href: '/contact' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Pages</h3>
      <ul className="list-none p-0">
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <a
              href={link.href}
              className="text-sm text-gray-300 no-underline hover:text-indigo-200"
            >
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
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-3">
        Subscribe our newsletter to get our latest update & news.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center mb-3 gap-2"
      >
        <input
          id="newsletter-email"
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          className="p-2 rounded-lg border border-blue-500 outline-none text-sm h-9 w-full sm:w-auto flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-gray-900 p-2 rounded-lg border-none cursor-pointer h-9 flex items-center justify-center"
          aria-label="Subscribe"
        >
          <svg
            className="w-4 h-4 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
      <label
        htmlFor="newsletter-email"
        className="flex items-start gap-2 text-xs text-gray-300"
      >
        <input type="checkbox" className="mt-1" /> I agree to all terms and
        policies
      </label>
    </div>
  );
};

const ContactInfo = () => {
  const contacts = [
    { type: 'phone', value: '0155 829 8719', href: 'tel:01558298719' },
    {
      type: 'email',
      value: 'support@trek-too.com',
      href: 'mailto:support@trek-too.com',
    },
    {
      type: 'address',
      value: '24-26 Arcadia Avenue, Fin009/15302, London, United Kingdom',
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Contact</h3>
      {contacts.map((contact, index) => (
        <div key={index} className="flex items-start mb-2">
          <ContactIcon type={contact.type} />
          {contact.href ? (
            <a
              href={contact.href}
              className="text-sm text-gray-300 ml-2 hover:text-indigo-200 break-words"
            >
              {contact.value}
            </a>
          ) : (
            <span className="text-sm text-gray-300 ml-2 break-words">
              {contact.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export { SupportBanner, CompanyInfo, PagesLinks, NewsletterForm, ContactInfo };
