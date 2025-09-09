'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import toast, { Toaster } from 'react-hot-toast';
import { SearchButton } from '@/components/ui/LoadingButton';
import {
  Search,
  X,
  Hotel,
  MapPin,
  Ticket,
  Car,
  Compass,
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  ArrowRight,
} from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { useLocations } from '@/hooks/useHotels';

// Utility function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Enhanced service options with better visual hierarchy
const serviceOptions = [
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    available: true,
    route: '/hotels-list',
    color: 'from-blue-500 to-blue-600',
    description: 'Find the perfect stay',
  },
  {
    id: 'tours',
    label: 'Tours & Experiences',
    icon: Compass,
    available: false,
    route: '/tours',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'attractions',
    label: 'Attraction Tickets',
    icon: Ticket,
    available: false,
    route: '/attractions',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: MapPin,
    available: false,
    route: '/transport',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'cars',
    label: 'Car Rentals',
    icon: Car,
    available: false,
    route: '/car-rentals',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
];

function HeroContent() {
  const [selectedService, setSelectedService] = useState('hotels');
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({ children: 0, adult: 1 });
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const dateFromPickerRef = useRef(null);
  const dateToPickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const router = useRouter();
  const totalGuests = guests.children + guests.adult;

  const { data: locationsData, isLoading, error } = useLocations(searchQuery);
  const locations = locationsData?.data || [];
  const errorMessage = locationsData?.errorMessage;

  // Enhanced intersection observer for better performance
  const { ref: contentRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  // Filter locations case-insensitively for additional client-side matching
  const filteredLocations = locations.filter((location) =>
    location.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enhanced click outside handling with better performance
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = (ref) =>
        ref.current && !ref.current.contains(event.target);

      if (isOutside(dateFromPickerRef)) setSelectedDateFrom((prev) => prev);
      if (isOutside(dateToPickerRef)) setSelectedDateTo((prev) => prev);
      if (isOutside(guestsDropdownRef)) setIsGuestsDropdownOpen(false);
      if (isOutside(searchDropdownRef) && isOutside(searchInputRef))
        setIsSearchDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Enhanced service selection with better feedback
  const handleServiceSelect = useCallback(
    (serviceId) => {
      const service = serviceOptions.find((s) => s.id === serviceId);

      if (!service.available) {
        toast.error('Coming Soon!', {
          duration: 3000,
          position: 'top-center',
        });
        return;
      }

      // If it's hotels, use the existing hotel search functionality
      if (serviceId === 'hotels') {
        setSelectedService(serviceId);
        toast.success(`Selected ${service.label}`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }

      // For other services, navigate to their dedicated pages
      if (service.route) {
        toast.loading(`Redirecting to ${service.label}...`, {
          duration: 1000,
          position: 'top-center',
        });
        setTimeout(() => {
          router.push(service.route);
        }, 1000);
        return;
      }

      setSelectedService(serviceId);
    },
    [router]
  );

  // Enhanced guest management with validation
  const handleGuestChange = useCallback((category, increment) => {
    setGuests((prev) => {
      const newValue = Math.max(0, prev[category] + (increment ? 1 : -1));

      // Ensure at least one adult
      if (category === 'adult' && newValue === 0) {
        toast.error('At least one adult is required', {
          duration: 3000,
          position: 'top-center',
        });
        return prev;
      }

      // Limit adults to maximum 7
      if (category === 'adult' && newValue > 7) {
        toast.error('Maximum 7 adults allowed', {
          duration: 3000,
          position: 'top-center',
        });
        return prev;
      }

      return {
        ...prev,
        [category]: newValue,
      };
    });
  }, []);

  // Enhanced date formatting with validation
  const formatDateToApi = useCallback((date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Enhanced search with better error handling and loading states
  const handleSearch = useCallback(async () => {
    // Clear previous errors
    setSearchError(null);

    // Validation with better user feedback
    if (!selectedCity) {
      setSearchError('Please select a destination city');
      toast.error('Please select a destination city', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (!selectedDateFrom) {
      setSearchError('Please select a check-in date');
      toast.error('Please select a check-in date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (!selectedDateTo) {
      setSearchError('Please select a check-out date');
      toast.error('Please select a check-out date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (totalGuests === 0) {
      setSearchError('Please select at least one guest');
      toast.error('Please select at least one guest', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    // Check if checkout is after checkin
    if (selectedDateTo <= selectedDateFrom) {
      setSearchError('Check-out date must be after check-in date');
      toast.error('Check-out date must be after check-in date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    setIsSearching(true);

    try {
      const queryParams = new URLSearchParams({
        location_id: selectedCity.id,
        checkin: formatDateToApi(selectedDateFrom),
        checkout: formatDateToApi(selectedDateTo),
        adults: String(guests.adult),
        children: String(guests.children),
      }).toString();

      toast.success('Searching for hotels...', {
        duration: 2000,
        position: 'top-center',
      });

      // Simulate search delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push(`/hotels-list?${queryParams}`);
    } catch (error) {
      setSearchError('An error occurred while searching. Please try again.');
      toast.error('Search failed. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSearching(false);
    }
  }, [
    selectedCity,
    selectedDateFrom,
    selectedDateTo,
    guests,
    formatDateToApi,
    router,
  ]);

  // Enhanced city selection with better UX
  const handleCitySelect = useCallback((location) => {
    setSelectedCity(location);
    setSearchQuery(location.title);
    setIsSearchDropdownOpen(false);
    setSearchError(null);

    toast.success(`Selected ${location.title}`, {
      duration: 2000,
      position: 'top-center',
    });
  }, []);

  // Enhanced input handling with debouncing
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedCity(null);
    setSearchError(null);

    if (value.length >= 3) {
      setIsSearchDropdownOpen(true);
    } else {
      setIsSearchDropdownOpen(false);
    }
  }, []);

  // Enhanced clear search with confirmation
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedCity(null);
    setIsSearchDropdownOpen(false);
    setSearchError(null);

    toast.success('Search cleared', {
      duration: 2000,
      position: 'top-center',
    });
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Animation variants for enhanced performance
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div ref={contentRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* New Left-Right Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
        {/* Left Side - Text Content with Magic Effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-left space-y-16 relative"
        >
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Gradient Orbs */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  x: [null, Math.random() * 400 - 200],
                  y: [null, Math.random() * 400 - 200],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute w-32 h-32 rounded-full blur-xl"
                style={{
                  background:
                    i % 3 === 0
                      ? 'linear-gradient(45deg, #3b82f6, #60a5fa)'
                      : i % 3 === 1
                        ? 'linear-gradient(45deg, #1e40af, #3b82f6)'
                        : 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
                }}
              />
            ))}

            {/* Floating Icons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`icon-${i}`}
                initial={{ opacity: 0, y: 20, x: Math.random() * 300 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [-20, -40, -60],
                  x: [null, Math.random() * 200 - 100],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeOut',
                }}
                className="absolute text-blue-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {i % 4 === 0 ? (
                  <Compass className="w-6 h-6" />
                ) : i % 4 === 1 ? (
                  <MapPin className="w-6 h-6" />
                ) : i % 4 === 2 ? (
                  <Ticket className="w-6 h-6" />
                ) : (
                  <Hotel className="w-6 h-6" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Enhanced Main Title with Advanced Effects */}
          <motion.div variants={itemVariants} className="relative">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight relative"
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                textShadow:
                  '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(59, 130, 246, 0.3)',
                willChange: 'transform',
                letterSpacing: '-0.02em',
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.2,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="block text-white"
              >
                Discover Your Next
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="block relative"
              >
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Adventure
                </span>
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Enhanced Subtitle with Typewriter Effect */}
          <motion.div variants={itemVariants} className="relative">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-normal max-w-lg relative"
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.01em',
                lineHeight: '1.6',
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                From exotic beaches to bustling cities, find your perfect escape
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="block mt-2"
              >
                and create memories that last a lifetime
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Side - Search Form with Advanced Glassmorphism */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8 relative"
        >
          {/* Floating Particles Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                  y: [0, -100, -200],
                  x: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Service Selection Tabs with Enhanced Glassmorphism */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white font-semibold text-lg mb-4 text-center"
              >
                Choose Your Experience
              </motion.h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {serviceOptions.map((service, index) => {
                  const IconComponent = service.icon;
                  const isSelected = selectedService === service.id;
                  const isAvailable = service.available;

                  return (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`
                        group relative flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 backdrop-blur-sm
                    ${
                      isSelected && isAvailable
                        ? `bg-gradient-to-r ${service.color} text-white shadow-xl transform scale-105 border border-white/30`
                        : !isAvailable
                          ? 'text-gray-300 bg-white/5 cursor-not-allowed opacity-60 border border-white/10'
                          : 'text-white/90 bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/20 hover:border-white/40'
                    }
                    active:scale-95
                  `}
                      whileHover={
                        isAvailable
                          ? {
                              y: -3,
                              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                            }
                          : {}
                      }
                      whileTap={isAvailable ? { scale: 0.95 } : {}}
                      aria-label={`Select ${service.label}`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="h-4 w-4 flex-shrink-0" />
                      </motion.div>
                      <span className="whitespace-nowrap">{service.label}</span>

                      {/* Enhanced Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 pointer-events-none whitespace-nowrap z-[9999] border border-white/20"
                      >
                        {service.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Search Form with Advanced Glassmorphism */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-700/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-white font-semibold text-xl mb-6 text-center"
              >
                Plan Your Perfect Trip
              </motion.h3>
              <div className="space-y-8">
                {/* Enhanced City Search */}
                <div className="relative" ref={searchInputRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Search for a city"
                      className={`w-full h-14 px-6 text-base rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm ${
                        searchError && !selectedCity
                          ? 'border-red-400/50 bg-red-500/10 text-white placeholder-red-200'
                          : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/15 focus:bg-white/20'
                      }`}
                      onFocus={() =>
                        searchQuery.length >= 3 && setIsSearchDropdownOpen(true)
                      }
                      aria-label="Search for a city"
                    />

                    {searchQuery && (
                      <motion.button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        aria-label="Clear search"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    )}

                    {selectedCity && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Enhanced Search Dropdown */}
                  <AnimatePresence>
                    {isSearchDropdownOpen && searchQuery.length >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-2 z-[9999] shadow-2xl max-h-60 overflow-y-auto"
                        ref={searchDropdownRef}
                        aria-label="City search results"
                      >
                        {isLoading ? (
                          <div className="p-4 text-gray-500 text-base flex items-center gap-3">
                            <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                            <span>Searching cities...</span>
                          </div>
                        ) : errorMessage ? (
                          <div className="p-4 text-red-500 text-base flex items-center gap-3">
                            <AlertCircle className="h-5 w-5" />
                            <span>{errorMessage}</span>
                          </div>
                        ) : filteredLocations.length > 0 ? (
                          filteredLocations.map((location) => (
                            <motion.div
                              key={location.id}
                              onClick={() => handleCitySelect(location)}
                              className="p-4 flex items-center hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                              role="option"
                              aria-selected={selectedCity?.id === location.id}
                              whileHover={{ backgroundColor: '#f9fafb' }}
                            >
                              <span className="text-gray-900 text-base font-medium">
                                {location.title}
                              </span>
                            </motion.div>
                          ))
                        ) : (
                          <div className="p-4 text-gray-500 text-base">
                            No cities found
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Date and Guest Selection Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Check-in Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    ref={dateFromPickerRef}
                  >
                    <DateInput
                      selectedDate={selectedDateFrom}
                      onChange={setSelectedDateFrom}
                      placeholder="Check-in"
                      minDate={today}
                      className={`h-14 text-base rounded-2xl border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/15 focus:bg-white/20 backdrop-blur-sm ${
                        searchError && !selectedDateFrom
                          ? 'border-red-400/50 bg-red-500/10'
                          : ''
                      }`}
                      aria-label="Select check-in date"
                    />
                  </motion.div>

                  {/* Check-out Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    ref={dateToPickerRef}
                  >
                    <DateInput
                      selectedDate={selectedDateTo}
                      onChange={setSelectedDateTo}
                      placeholder="Check-out"
                      minDate={
                        selectedDateFrom ? addDays(selectedDateFrom, 1) : today
                      }
                      disabled={!selectedDateFrom}
                      className={`h-14 text-base rounded-2xl border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/15 focus:bg-white/20 backdrop-blur-sm ${
                        searchError && !selectedDateTo
                          ? 'border-red-400/50 bg-red-500/10'
                          : ''
                      }`}
                      aria-label="Select check-out date"
                    />
                  </motion.div>

                  {/* Guests Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="relative"
                    ref={guestsDropdownRef}
                  >
                    <motion.button
                      type="button"
                      onClick={() =>
                        setIsGuestsDropdownOpen(!isGuestsDropdownOpen)
                      }
                      className={`w-full h-14 px-6 text-base rounded-2xl border transition-all duration-300 text-left flex items-center gap-3 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm ${
                        searchError && totalGuests === 0
                          ? 'border-red-400/50 bg-red-500/10 text-white placeholder-red-200'
                          : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/15 focus:bg-white/20'
                      }`}
                      aria-label="Select number of guests"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Users className="h-5 w-5 text-white/60 flex-shrink-0" />
                      <span
                        className={`truncate ${totalGuests > 0 ? 'text-white' : 'text-white/60'}`}
                      >
                        {totalGuests > 0
                          ? `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`
                          : 'Guests'}
                      </span>
                      <motion.svg
                        animate={{ rotate: isGuestsDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-auto h-5 w-5 text-white/60"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6 8l4 4 4-4"
                        />
                      </motion.svg>
                    </motion.button>

                    {/* Enhanced Guests Dropdown */}
                    <AnimatePresence>
                      {isGuestsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-2 z-[9999] shadow-2xl"
                        >
                          <div className="p-4 space-y-4 w-full max-w-xs">
                            {['adult', 'children'].map((category) => (
                              <div
                                key={category}
                                className="flex items-center justify-between w-full"
                              >
                                <span className="text-gray-700 capitalize font-medium text-sm">
                                  {category === 'adult' ? 'Adults' : 'Children'}
                                </span>
                                <div className="flex items-center justify-center gap-1">
                                  <motion.button
                                    type="button"
                                    onClick={() =>
                                      handleGuestChange(category, false)
                                    }
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                                    disabled={
                                      guests[category] === 0 ||
                                      (category === 'adult' &&
                                        guests[category] === 1)
                                    }
                                    aria-label={`Decrease number of ${category}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    -
                                  </motion.button>
                                  <span className="w-4 text-center font-semibold text-gray-900 text-xs">
                                    {guests[category]}
                                  </span>
                                  <motion.button
                                    type="button"
                                    onClick={() =>
                                      handleGuestChange(category, true)
                                    }
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                                    disabled={
                                      (category === 'adult' &&
                                        guests[category] >= 7) ||
                                      (category === 'children' &&
                                        guests[category] >= 10)
                                    }
                                    aria-label={`Increase number of ${category}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    +
                                  </motion.button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Enhanced Search Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="relative"
                >
                  <motion.button
                    type="button"
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold gap-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 shadow-2xl flex flex-row items-center justify-center disabled:cursor-not-allowed relative overflow-hidden group"
                    whileHover={
                      !isSearching
                        ? {
                            scale: 1.05,
                            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                          }
                        : {}
                    }
                    whileTap={!isSearching ? { scale: 0.95 } : {}}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />

                    {isSearching ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin flex-shrink-0 relative z-10" />
                        <span className="whitespace-nowrap text-lg relative z-10">
                          Searching...
                        </span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative z-10"
                        >
                          <Search className="h-6 w-6 flex-shrink-0" />
                        </motion.div>
                        <span className="whitespace-nowrap text-lg relative z-10">
                          Search Hotels
                        </span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>

                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 blur-xl -z-10"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Error Display */}
      {searchError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2 max-w-md mx-auto"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{searchError}</span>
        </motion.div>
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#3b82f6',
            color: '#fff',
            border: '1px solid #2563eb',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '16px',
            marginTop: '10px',
          },
          success: {
            icon: null,
            style: {
              background: '#3b82f6',
              color: '#fff',
              border: '1px solid #2563eb',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
          error: {
            icon: null,
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #dc2626',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
          loading: {
            icon: null,
            style: {
              background: '#3b82f6',
              color: '#fff',
              border: '1px solid #2563eb',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
        }}
      />
    </div>
  );
}

export default HeroContent;
