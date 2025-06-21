import React from 'react';
import PropTypes from 'prop-types';
import { Check, X, Users, MapPin, Globe } from 'lucide-react';

const TourInformation = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Included/Exclude
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#1E2A44] mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Pick and Drop Services
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#1E2A44] mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  1 Meal Per Day
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#1E2A44] mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Cruise Dinner & Music Event
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#1E2A44] mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Visit 7 Best Places in the City With Group
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Additional Services
                </span>
              </div>
              <div className="flex items-start">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Insurance
                </span>
              </div>
              <div className="flex items-start">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Food & Drinks
                </span>
              </div>
              <div className="flex items-start">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Tickets
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-8"></div>
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tour Amenities
          </h2>
          <div className="border-t border-gray-200 my-8"></div>
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tour Plan
          </h2>
        </div>
        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3
              className="text-2xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Tour Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Max Guests
                  </p>
                  <p
                    className="text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    12
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Min Guests
                  </p>
                  <p
                    className="text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    1
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Min Age
                  </p>
                  <p
                    className="text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    10+
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Tour Location
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-4">
                  <Globe className="h-5 w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Languages Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TourInformation.propTypes = {};

export default TourInformation;
