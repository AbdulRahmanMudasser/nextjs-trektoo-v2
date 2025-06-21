'use client';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Map = () => {
  const [modeOfTravel, setModeOfTravel] = useState('Walking');
  const mapRef = useRef(null);

  return (
    <div className="min-h-screen bg-white flex ml-5 flex-col items-start p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Location
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="modeOfTravel"
              className="text-sm font-medium text-gray-700"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Mode of Travel:
            </label>
            <select
              id="modeOfTravel"
              value={modeOfTravel}
              onChange={(e) => setModeOfTravel(e.target.value)}
              className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A3BFFA]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <option value="Walking">Walking</option>
              <option value="Driving">Driving</option>
              <option value="Public Transit">Public Transit</option>
              <option value="Cycling">Cycling</option>
            </select>
          </div>
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#A3BFFA]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
        </div>
        <div className="relative w-full h-64 rounded-md overflow-hidden border-2 border-gray-300">
          <div
            ref={mapRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            <p
              className="text-center text-gray-500"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Map feature is temporarily disabled.
            </p>
          </div>
        </div>
        <div
          className="flex justify-between items-center mt-2 text-xs text-gray-500"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>Map ©2025 Google</span>
          <div className="space-x-2">
            <a href="#" className="hover:underline">
              Keyboard shortcuts
            </a>
            <a href="#" className="hover:underline">
              Map data ©2025 Google
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Report a map error
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Map.propTypes = {};

export default Map;
