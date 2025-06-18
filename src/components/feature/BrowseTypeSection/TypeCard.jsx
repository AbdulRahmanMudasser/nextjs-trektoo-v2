'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaMountain,
  FaBinoculars,
  FaBiking,
  FaUmbrellaBeach,
} from 'react-icons/fa';

const TypeCard = ({ title, type, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            entry.target.style.transform = 'translateX(0)';
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.width = isHovered ? '25px' : '5px';
      lineRef.current.style.transition = 'width 0.3s ease-in-out';
    }
  }, [isHovered]);

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
    <div
      ref={cardRef}
      className="relative bg-white rounded-lg p-6 shadow-lg text-center w-full max-w-[220px] mx-auto transition-all duration-300 cursor-pointer hover:shadow-xl h-[300px]"
      style={{
        transform: 'translateX(-100px)',
        opacity: 0,
        transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${title} type card`}
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

      {/* Title */}
      <h3
        className="text-lg font-semibold mb-3"
        style={{
          color: isHovered ? '#fff' : '#1E2A44',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        {title}
      </h3>

      {/* Icon */}
      <div className="my-6">{icons[type]}</div>

      {/* Divider */}
      <div
        ref={lineRef}
        className="w-5 h-0.5 mx-auto mb-3"
        style={{
          backgroundColor: isHovered ? '#fff' : '#1E2A44',
          transition: 'background-color 0.3s ease-in-out',
        }}
      />

      {/* Description */}
      <p
        className="text-sm leading-6"
        style={{
          color: isHovered ? '#fff' : '#1E2A44',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default TypeCard;
