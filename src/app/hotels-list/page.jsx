'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { RefreshCw, Loader2, Plus, Minus, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data with Unsplash images
const mockTours = [
  {
    id: '1',
    title: 'Tropical Island Escape',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    rating: 4,
    location: 'Maldives',
    price: '$1299',
    duration: '5 Days',
    groupSize: 'Up to 8',
    discount: '10% Off',
    photoCount: 6,
    description: 'A serene getaway to paradise islands.',
  },
  {
    id: '2',
    title: 'Alpine Adventure Trek',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    rating: 5,
    location: 'Swiss Alps',
    price: '$1899',
    duration: '7 Days',
    groupSize: 'Up to 12',
    discount: '17% Off',
    photoCount: 4,
    description: 'Explore majestic peaks and valleys.',
  },
  {
    id: '3',
    title: 'Urban Cultural Journey',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    rating: 3,
    location: 'Tokyo, Japan',
    price: '$999',
    duration: '4 Days',
    groupSize: 'Up to 15',
    discount: '5% Off',
    photoCount: 5,
    description: 'Dive into vibrant city culture.',
  },
  {
    id: '4',
    title: 'Desert Safari',
    image:
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    rating: 4,
    location: 'Dubai, UAE',
    price: '$1499',
    duration: '6 Days',
    groupSize: 'Up to 10',
    discount: '3% Off',
    photoCount: 7,
    description: 'Experience the thrill of the desert.',
  },
];

// Cities for Popular Destinations
const cities = [
  {
    name: 'Seoul',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
  },
  {
    name: 'Beijing',
    image:
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
  },
  {
    name: 'Dubai',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cairo',
    image:
      'https://images.unsplash.com/photo-1578469451440-5d0337ab1e22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Luxor',
    image:
      'https://images.unsplash.com/photo-1598881645856-00f0101043e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tokyo',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kyoto',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f2c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Osaka',
    image:
      'https://images.unsplash.com/photo-1505060827556-4d6b58aa5da9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Singapore',
    image:
      'https://images.unsplash.com/photo-1513046892-d03f0c6f4856?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Paris',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rome',
    image:
      'https://images.unsplash.com/photo-1552832230-c5457d3a94ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1583422323728-f9c1f3e3d873?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bangkok',
    image:
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chiang Mai',
    image:
      'https://images.unsplash.com/photo-1588500121637-1854986176f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Phuket',
    image:
      'https://images.unsplash.com/photo-1589393740083-60b3a7b2d870?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const FilterCheckbox = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer group">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 transition-colors"
    />
    <span className="group-hover:text-blue-600 transition-colors font-medium">
      {label}
    </span>
  </label>
);

FilterCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const GuestSelector = ({ adults, setAdults, children, setChildren }) => (
  <div className="mb-8">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      Guests
    </label>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Adults</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdults((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Decrease adults"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-900">{adults}</span>
          <button
            onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Increase adults"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Children</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Decrease children"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-900">{children}</span>
          <button
            onClick={() => setChildren((prev) => Math.min(10, prev + 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Increase children"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

GuestSelector.propTypes = {
  adults: PropTypes.number.isRequired,
  setAdults: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
  setChildren: PropTypes.func.isRequired,
};

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const categories = [
    { label: 'Discovery Kayak Tour', value: 'kayak-tour', price: '$1200' },
    { label: 'Rainbow Valley Trek', value: 'rainbow-valley', price: '$1300' },
    { label: 'UK Cultural Journey', value: 'united-kingdom', price: '$2500' },
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setAdults(1);
    setChildren(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg sticky top-40 border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Plan Your Adventure
      </h3>
      <GuestSelector
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
      />
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer accent-blue-500"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Last Minute Deals
      </h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.value}
            className="flex justify-between items-center"
          >
            <FilterCheckbox
              label={category.label}
              value={category.value}
              checked={selectedCategories.includes(category.value)}
              onChange={handleCategoryChange}
            />
            <span className="text-sm text-gray-600 font-medium">
              {category.price}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-6 py-3 bg-blue-500 text-white text-sm font-medium uppercase rounded-xl hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearFilters}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 text-sm font-medium uppercase rounded-xl hover:bg-gray-300 transition-colors"
          aria-label="Clear all filters"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

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
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value={2}>2 per page</option>
        <option value={4}>4 per page</option>
        <option value={6}>6 per page</option>
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
    className="flex justify-between items-center mb-8"
  >
    <h3 className="text-2xl font-bold text-gray-900">{tourCount} Adventures</h3>
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 font-medium">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
  <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse h-80">
    <div className="w-full h-full bg-gray-200"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);

const TourListSection = ({ tours, loading }) => {
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const totalTours = tours.length;
  const totalPages = Math.ceil(totalTours / itemsPerPage);

  const sortedTours = [...tours].sort((a, b) => {
    if (sortBy === 'price')
      return (
        parseFloat(a.price.replace('$', '')) -
        parseFloat(b.price.replace('$', ''))
      );
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.title.localeCompare(b.title);
  });

  const paginatedTours = sortedTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(itemsPerPage)].map((_, i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tours.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600 text-lg font-medium py-12"
      >
        No tours found. Try adjusting your search.
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <TourListHeader
        tourCount={totalTours}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence>
          {paginatedTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-80"
              role="article"
              aria-label={`Tour: ${tour.title}`}
            >
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                placeholder="blur"
                blurDataURL="/images/fallback-tour.jpg"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 text-lg">
                    {'★'.repeat(tour.rating) + '☆'.repeat(5 - tour.rating)}
                  </span>
                  <span className="text-gray-300 text-xs font-medium">
                    ({tour.rating})
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white truncate">
                  {tour.title}
                </h3>
                <div className="flex items-center text-gray-200 text-sm font-medium">
                  <span className="mr-2">📍</span> {tour.location}
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-white">
                    {tour.price}
                  </span>
                  <span className="text-sm text-gray-300 font-medium">
                    /night
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-200 font-medium gap-4 mt-1">
                  <span className="flex items-center">
                    <span className="mr-1">⏰</span>
                    {tour.duration}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">👥</span>
                    {tour.groupSize}
                  </span>
                </div>
                {tour.discount && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {tour.discount}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">📷</span> {tour.photoCount}
                </div>
                <Link
                  href={{
                    pathname: `/hotel/${tour.id}`,
                    query: {
                      ...tour,
                      hotel_name: tour.title.replace(/\s+/g, '-'),
                    },
                  }}
                  className="mt-4 inline-block w-full text-center bg-blue-500 text-white font-medium py-2 px-6 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Explore Now
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
  );
};

TourListSection.propTypes = {
  tours: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const PopularDestinations = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const filteredCities =
    selectedCity === 'all'
      ? cities
      : cities.filter((city) => city.name === selectedCity);
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Popular Destinations
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Filter:</span>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedCities.slice(0, 3).map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-64"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 320px, 400px"
                className="object-cover transition-transform duration-500 hover:scale-105"
                placeholder="blur"
                blurDataURL="/images/fallback-destination.jpg"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white">
                  {city.name}
                </h3>
                <Link
                  href={`/destinations/${city.name.toLowerCase()}`}
                  className="mt-4 inline-block w-full text-center bg-blue-500 text-white font-medium py-1 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Discover
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
    </section>
  );
};

const ToursListMain = ({ tours, loading }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <FilterSidebar />
      </div>
      <div className="lg:w-3/4">
        <TourListSection tours={tours} loading={loading} />
      </div>
    </div>
    <PopularDestinations />
  </div>
);

const HeaderSubtitle = ({ children }) => (
  <p className="mt-3 text-lg md:text-xl text-gray-200 font-medium max-w-3xl mx-auto">
    {children}
  </p>
);

HeaderSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderTitle = ({ children }) => (
  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
    {children}
  </h1>
);

HeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="flex flex-col items-center text-center"
  >
    <HeaderTitle>Discover Your Next Adventure</HeaderTitle>
    <HeaderSubtitle>
      Embark on journeys that inspire and transform
    </HeaderSubtitle>
  </motion.div>
);

const HeaderSection = () => (
  <section className="relative w-full h-[500px]">
    <Image
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      alt="Travel hero"
      fill
      sizes="100vw"
      className="object-cover"
      priority
      quality={80}
    />
    <div className="relative z-10 flex items-center justify-center h-full px-4">
      <HeaderContent />
    </div>
  </section>
);

const HotelsList = () => {
  const [loading] = useState(false);

  return (
    <>
      <HeaderSection />
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white rounded-3xl shadow-xl my-12"
        >
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
          <h3 className="text-2xl font-bold text-gray-800 mt-4">
            Curating Your Adventures
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Exploring the best tours for your journey...
          </p>
        </motion.div>
      ) : (
        <ToursListMain tours={mockTours} loading={loading} />
      )}
    </>
  );
};

export default HotelsList;
