'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

const PaginationButton = ({ label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full ${active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'} transition-colors`}
  >
    {label}
  </motion.button>
);

PaginationButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
    <div className="flex gap-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationButton
          key={i + 1}
          label={(i + 1).toString()}
          active={currentPage === i + 1}
          onClick={() => onPageChange(i + 1)}
        />
      ))}
      <PaginationButton
        label="Next"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Show:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(+e.target.value)}
        className="border border-blue-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95"
      >
        <option value={2}>2 per page</option>
        <option value={4}>4 per page</option>
        <option value={6}>6 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

const TourListHeader = ({ tourCount, sortBy, onSortChange }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-between items-center mb-8"
  >
    <h3 className="text-2xl font-extrabold text-gray-900">
      {tourCount} Hotels
    </h3>
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 font-medium">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-blue-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95"
      >
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>
    </div>
  </motion.div>
);

TourListHeader.propTypes = {
  tourCount: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

const TourCardSkeleton = () => (
  <div className="relative bg-white/95 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-64 animate-pulse border border-blue-50">
    <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
    </div>
    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const proxiedSrc = src.includes('staging.trektoo.com')
    ? `/api/image/proxy?url=${encodeURIComponent(src)}`
    : src;

  return (
    <div className="relative w-full h-full">
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <span className="text-gray-600 text-sm font-medium mt-2">
            Image Unavailable
          </span>
        </div>
      ) : (
        <Image
          src={proxiedSrc}
          alt={alt}
          onError={(e) => {
            console.error('Image load error:', { src, error: e.message });
            setHasError(true);
          }}
          {...props}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const TourListSection = ({ hotels, loading, error }) => {
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const totalHotels = hotels.length;
  const totalPages = Math.ceil(totalHotels / itemsPerPage);

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === 'price') {
      return (
        parseFloat(a.sale_price || a.price) -
        parseFloat(b.sale_price || b.price)
      );
    }
    if (sortBy === 'rating') {
      return (
        parseFloat(b.review_score.score_total) -
        parseFloat(a.review_score.score_total)
      );
    }
    return a.title.localeCompare(b.title);
  });

  const paginatedHotels = sortedHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  if (loading) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            <div className="space-y-6">
              {[...Array(itemsPerPage)].map((_, i) => (
                <TourCardSkeleton key={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 text-lg font-medium py-12"
            >
              Failed to load hotels. Please try again later.
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (!hotels.length) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 text-lg font-medium py-12"
            >
              No hotels found. Try adjusting your search.
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="relative w-full bg-blue-50/50 px-0 mb-4 sm:mb-6"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="hotel-list-heading"
    >
      <div className="w-full">
        <motion.div
          className="border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <div className="space-y-8">
            <TourListHeader
              tourCount={totalHotels}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <div className="grid grid-cols-1 gap-8">
              <AnimatePresence>
                {paginatedHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative bg-white/95 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-auto border border-blue-50"
                    role="article"
                    aria-label={`Hotel: ${hotel.title}`}
                  >
                    <div className="relative w-full md:w-1/2 h-80">
                      <ImageWithFallback
                        src={hotel.image}
                        alt={hotel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        quality={80}
                        loading="lazy"
                      />
                      {hotel.discount_percent && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {hotel.discount_percent}% Off
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-500 text-lg">
                            {'★'.repeat(
                              Math.round(
                                parseFloat(hotel.review_score.score_total)
                              )
                            ) +
                              '☆'.repeat(
                                5 -
                                  Math.round(
                                    parseFloat(hotel.review_score.score_total)
                                  )
                              )}
                          </span>
                          <span className="text-gray-600 text-xs font-medium">
                            ({hotel.review_score.score_total})
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 truncate mb-2">
                          {hotel.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                          <span className="mr-2">📍</span> {hotel.location.name}
                        </div>
                        <p
                          className="text-sm text-gray-600 leading-relaxed mb-4"
                          dangerouslySetInnerHTML={{
                            __html: hotel.content.substring(0, 100) + '...',
                          }}
                        />
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${hotel.sale_price || hotel.price}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            /night
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/hotel/${hotel.id}`}
                        className="mt-4 inline-block w-full text-center bg-blue-500 text-white font-medium py-2 sm:py-2.5 px-5 sm:px-8 rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

TourListSection.propTypes = {
  hotels: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TourListSection;
