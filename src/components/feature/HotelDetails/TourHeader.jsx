import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  MapPin,
  ThumbsUp,
  Clock,
  Leaf,
  Share2,
  MessageCircle,
  Heart,
} from 'lucide-react';

const TourHeader = ({
  id,
  title = 'Unnamed Hotel',
  location = 'Unknown Location',
  price = '$199.99',
  duration = '3 Days',
  rating = 3,
  photoCount = 5,
  discount = '',
  image = '/default-hotel.jpg',
}) => {
  const numericRating = parseFloat(rating.toString()) || 3;
  const numericPhotoCount = parseInt(photoCount.toString()) || 5;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;

  return (
    <div className="font-sans">
      <div className="relative w-full h-[400px] bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/default-hotel.jpg"
          onError={(e) => {
            console.warn(`Failed to load header image for ${title}: ${image}`);
            e.currentTarget.src = '/default-hotel.jpg';
          }}
        />
        {discount && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
            {discount}
          </div>
        )}
      </div>
      <div className="bg-gray-50 py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {title}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 text-[#A3BFFA] mr-2" />
                <span
                  className="text-sm sm:text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {location}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-2 sm:mr-3">
                  <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    From
                  </p>
                  <p
                    className="text-sm sm:text-base text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {price}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-2 sm:mr-3">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Duration
                  </p>
                  <p
                    className="text-sm sm:text-base text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F7F9FF] flex items-center justify-center mr-2 sm:mr-3">
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-[#A3BFFA]" />
                </div>
                <div>
                  <p
                    className="text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Tour Type
                  </p>
                  <p
                    className="text-sm sm:text-base text-gray-800 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {discount || 'Standard'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center">
              {[...Array(fullStars)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#f39c12] fill-[#f39c12]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              {hasHalfStar && (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#f39c12]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                  <path
                    d="M12 2V17.27L5.82 21L7.46 13.97L2 9.24L9.19 8.63L12 2Z"
                    fill="#f39c12"
                  />
                </svg>
              )}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <svg
                  key={i + fullStars + 1}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                </svg>
              ))}
              <span
                className="ml-2 text-sm sm:text-base text-gray-700 font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {numericRating.toFixed(2)} by {numericPhotoCount} reviews
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F7F9FF] hover:bg-[#A3BFFA] hover:text-white rounded-md text-xs sm:text-sm font-medium text-[#1E2A44]"
                aria-label="Share tour"
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#A3BFFA] hover:text-white" />
                SHARE
              </button>
              <button
                className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F7F9FF] hover:bg-[#A3BFFA] hover:text-white rounded-md text-xs sm:text-sm font-medium text-[#1E2A44]"
                aria-label="View reviews"
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#A3BFFA] hover:text-white" />
                REVIEWS
              </button>
              <button
                className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F7F9FF] hover:bg-[#A3BFFA] hover:text-white rounded-md text-xs sm:text-sm font-medium text-[#1E2A44]"
                aria-label="Add to wishlist"
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#A3BFFA] hover:text-white" />
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TourHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  duration: PropTypes.string,
  rating: PropTypes.number,
  photoCount: PropTypes.number,
  discount: PropTypes.string,
  image: PropTypes.string,
};

export default TourHeader;
