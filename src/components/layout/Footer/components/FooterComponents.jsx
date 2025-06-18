import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon, ContactIcon } from './Icons';

const SupportBanner = () => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-600 mb-6">
      <div className="flex items-center">
        <svg
          className="w-4 h-4 text-indigo-200 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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

SupportBanner.propTypes = {};

const CompanyInfo = () => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <h3 className="text-xl font-bold text-white">Trektoo</h3>
      </div>
      <p className="text-sm text-gray-300 mb-3">
        To take trivial example which us ever undertakes laborious physical
        exercise except obsome.
      </p>
      <div className="flex">
        <SocialIcon type="twitter" />
        <SocialIcon type="facebook" />
        <SocialIcon type="instagram" />
        <SocialIcon type="linkedin" />
      </div>
    </div>
  );
};

CompanyInfo.propTypes = {};

const PagesLinks = () => {
  const links = [
    'About us',
    'Community Blog',
    'Work with Us',
    'Privacy Policy',
    'Contact us',
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Pages</h3>
      <ul className="list-none p-0">
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <a
              href="#"
              className="text-sm text-gray-300 no-underline hover:text-indigo-200"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

PagesLinks.propTypes = {};

const NewsletterForm = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-3">
        Subscribe our newsletter to get our latest update & news.
      </p>
      <div className="flex items-center mb-3">
        <input
          type="email"
          placeholder="Email address"
          className="p-2 rounded-l-lg border border-blue-500 outline-none flex-1 text-sm h-9"
        />
        <button className="bg-blue-500 text-gray-900 p-2 rounded-r-lg border-none cursor-pointer h-9 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
      <label className="flex items-center text-xs text-gray-300">
        <input type="checkbox" className="mr-2" />I agree to all terms and
        policies
      </label>
    </div>
  );
};

NewsletterForm.propTypes = {};

const ContactInfo = () => {
  const contacts = [
    { type: 'phone', value: '00 (123) 456 889' },
    { type: 'email', value: 'contact@example.com' },
    { type: 'address', value: '583 Main Street, NY, USA' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Contact</h3>
      {contacts.map((contact, index) => (
        <div key={index} className="flex items-center mb-2">
          <ContactIcon type={contact.type} />
          <span className="text-sm text-gray-300">{contact.value}</span>
        </div>
      ))}
    </div>
  );
};

ContactInfo.propTypes = {};

export { SupportBanner, CompanyInfo, PagesLinks, NewsletterForm, ContactInfo };
