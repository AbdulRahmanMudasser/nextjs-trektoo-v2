'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMountain,
  FaBinoculars,
  FaBiking,
  FaUmbrellaBeach,
} from 'react-icons/fa';

const TypeCard = ({ title, type, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const icons = {
    'mountain-biking': (
      <FaBiking
        style={{
          width: '40px',
          height: '40px',
          color: isHovered ? '#fff' : '#1E2A44',
        }}
      />
    ),
    adventure: (
      <FaMountain
        style={{
          width: '40px',
          height: '40px',
          color: isHovered ? '#fff' : '#1E2A44',
        }}
      />
    ),
    beache: (
      <FaUmbrellaBeach
        style={{
          width: '40px',
          height: '40px',
          color: isHovered ? '#fff' : '#1E2A44',
        }}
      />
    ),
    discovery: (
      <FaBinoculars
        style={{
          width: '40px',
          height: '40px',
          color: isHovered ? '#fff' : '#1E2A44',
        }}
      />
    ),
  };

  return (
    <motion.div
      className="relative bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg text-center w-full max-w-[220px] mx-auto transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${title} type card`}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <style jsx>{`
        div::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          transition: background-color 0.3s ease-in-out;
          z-index: -1;
          border-radius: 8px;
        }
        div:hover::before {
          background-color: #3b82f6;
        }
        @media (min-width: 640px) {
          div {
            max-width: 250px;
          }
        }
        @media (min-width: 1024px) {
          div {
            max-width: 280px;
          }
        }
      `}</style>

      <h3
        className="text-lg font-semibold mb-3"
        style={{
          color: isHovered ? '#fff' : '#1E2A44',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        {title}
      </h3>

      <div className="my-4">{icons[type]}</div>

      <motion.div
        className="w-5 h-0.5 mx-auto mb-3"
        style={{
          backgroundColor: isHovered ? '#fff' : '#1E2A44',
        }}
        animate={{ width: isHovered ? '25px' : '5px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      <p
        className="text-sm leading-6"
        style={{
          color: isHovered ? '#fff' : '#1E2A44',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default TypeCard;
