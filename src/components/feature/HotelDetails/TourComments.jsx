import React from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, Star } from 'lucide-react';

const TourComments = () => {
  return (
    <div className="max-w-3xl mx-0 p-6 font-sans">
      <div className="mb-12">
        <h2
          className="text-xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          3 thoughts on "Cottages In The Middle Of Beach"
        </h2>
        <div className="w-12 h-1 bg-[#A3BFFA] mb-8"></div>
        {[
          {
            author: 'admin',
            date: 'February 8, 2023',
            ratings: [
              ['Quality', 4],
              ['Location', 5],
              ['Amenities', 5],
              ['Services', 4],
              ['Price', 4],
            ],
            comment:
              'It is a great place to shop not too far from New York. We took the bus from Port Authority and traveled through the countryside to get there.',
          },
          {
            author: 'admin',
            date: 'February 8, 2023',
            ratings: [
              ['Quality', 3],
              ['Location', 4],
              ['Amenities', 3],
              ['Services', 5],
              ['Price', 4],
            ],
            comment:
              'This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made!',
          },
        ].map(({ author, date, ratings, comment }, index) => (
          <div key={index} className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between mb-1">
                  <h3
                    className="text-lg font-medium text-gray-800"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {author}
                  </h3>
                  <button
                    className="text-gray-600 flex items-center text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    aria-label="Reply to comment"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </button>
                </div>
                <div
                  className="text-sm text-gray-500 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[#6ab04c] mr-2">—</span>
                  {date}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  {ratings.map(([label, score]) => (
                    <div key={label}>
                      <div
                        className="text-sm text-gray-600 mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {label}
                      </div>
                      <div className="flex">
                        {[...Array(score)].map((_, i) => (
                          <Star
                            key={`${label}-filled-${i}`}
                            className="h-4 w-4 text-[#f39c12] fill-[#f39c12]"
                          />
                        ))}
                        {[...Array(5 - Number(score))].map((_, i) => (
                          <Star
                            key={`${label}-empty-${i}`}
                            className="h-4 w-4 text-[#f39c12]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-8">
        <h2
          className="text-xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Add a Comment
        </h2>
        <div className="w-12 h-1 bg-[#A3BFFA] mb-4"></div>
        <p
          className="text-gray-600 text-sm mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Your email address will not be published.
        </p>
        <form>
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
            {['Quality', 'Location', 'Amenities'].map((label) => (
              <div key={label}>
                <div
                  className="text-gray-700 mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={`${label.toLowerCase()}-${i}`}
                      className="h-5 w-5 text-[#f39c12] fill-[#f39c12]"
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="ml-auto bg-gray-100 p-4 flex flex-col items-center justify-center">
              <div
                className="text-[#f39c12] text-2xl font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                5.00
              </div>
              <div
                className="text-gray-600 text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Average Rating
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
            {['Services', 'Price'].map((label) => (
              <div key={label}>
                <div
                  className="text-gray-700 mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={`${label.toLowerCase()}-${i}`}
                      className="h-5 w-5 text-[#f39c12] fill-[#f39c12]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your Name *"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3BFFA] focus:border-transparent"
              required
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3BFFA] focus:border-transparent"
              required
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Write Your Comment"
              rows={6}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3BFFA] focus:border-transparent"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            ></textarea>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="save-info"
              className="h-4 w-4 text-[#A3BFFA] border-gray-300 rounded focus:ring-[#A3BFFA] cursor-pointer"
            />
            <label
              htmlFor="save-info"
              className="ml-2 text-gray-700 text-sm cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#A3BFFA] hover:bg-[#8aa9ff] text-white font-bold py-2 px-4 rounded-md transition"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

TourComments.propTypes = {};

export default TourComments;
