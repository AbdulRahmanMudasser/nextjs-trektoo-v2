import React from 'react';
import PropTypes from 'prop-types';

const ReviewScores = () => {
  return (
    <div className="max-w-3xl p-6 font-sans">
      <h2
        className="text-2xl font-bold text-gray-800 mb-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Review Scores
      </h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
            <div
              className="text-7xl font-bold text-gray-800"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              4.13
            </div>
            <div
              className="text-lg text-gray-500 -mt-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              /5
            </div>
            <div
              className="text-[#A3BFFA] font-medium mt-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Wonderful
            </div>
            <div
              className="text-sm text-gray-500 mt-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              3 verified reviews
            </div>
          </div>
          <div className="p-8 md:w-2/3">
            <div className="space-y-4">
              {[
                { label: 'Quality', width: '73%', score: '3.67/5' },
                { label: 'Location', width: '87%', score: '4.33/5' },
                { label: 'Amenities', width: '93%', score: '4.67/5' },
                { label: 'Services', width: '80%', score: '4/5' },
                { label: 'Price', width: '80%', score: '4/5' },
              ].map(({ label, width, score }) => (
                <div key={label} className="flex items-center">
                  <div
                    className="w-24 text-gray-700"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {label}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#A3BFFA] rounded-full animate-[progressBar_1.5s_ease-in-out_infinite] hover:bg-[#1E2A44] transition-colors duration-300"
                        style={{ width }}
                      ></div>
                    </div>
                  </div>
                  <div
                    className="w-16 text-right text-gray-700"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewScores.propTypes = {};

export default ReviewScores;
