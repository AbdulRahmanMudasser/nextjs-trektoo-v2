'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Clock, Users, Star, Search, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const ToursHero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('any');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Dropdown states
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  
  // Refs for dropdowns
  const locationDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const durationDropdownRef = useRef(null);
  const budgetDropdownRef = useRef(null);

  const stats = [
    { icon: Compass, value: '500+', label: 'Unique Experiences' },
    { icon: MapPin, value: '50+', label: 'Destinations' },
    { icon: Clock, value: '24/7', label: 'Support' },
    { icon: Users, value: '10K+', label: 'Happy Travelers' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'nature', label: 'Nature' },
    { id: 'food', label: 'Food & Wine' },
    { id: 'water', label: 'Water Sports' },
    { id: 'urban', label: 'Urban Tours' },
  ];

  const locations = [
    { id: 'any', label: 'Any Location' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia' },
    { id: 'americas', label: 'Americas' },
    { id: 'africa', label: 'Africa' },
    { id: 'oceania', label: 'Oceania' },
  ];

  const durations = [
    { id: 'any', label: 'Any Duration' },
    { id: 'half-day', label: 'Half Day (4hrs)' },
    { id: 'full-day', label: 'Full Day (8hrs)' },
    { id: '2-3-days', label: '2-3 Days' },
    { id: '4-7-days', label: '4-7 Days' },
    { id: '1-week', label: '1+ Week' },
  ];

  const budgets = [
    { id: 'any', label: 'Any Budget' },
    { id: 'under-100', label: 'Under $100' },
    { id: '100-500', label: '$100 - $500' },
    { id: '500-1000', label: '$500 - $1000' },
    { id: '1000-2000', label: '$1000 - $2000' },
    { id: '2000-plus', label: '$2000+' },
  ];

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target)) {
        setIsDurationDropdownOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target)) {
        setIsBudgetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Searching for:', { searchQuery, selectedCategory, selectedLocation });
  };

  // Helper function to get display label
  const getDisplayLabel = (items, selectedId, defaultLabel) => {
    const item = items.find(item => item.id === selectedId);
    return item ? item.label : defaultLabel;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-3.jpg"
          alt="Adventure tours and experiences"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-blue-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Extraordinary
            </span>
            Experiences
          </h1>
        </motion.div>

                                   {/* Search Section - Main Feature - COMMENTED OUT FOR NOW */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 max-w-5xl mx-auto relative z-20"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative z-50 overflow-visible">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="lg:col-span-2">
                 <div className="relative">
                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                   <input
                     type="text"
                     placeholder="Search tours, experiences, destinations..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg font-medium"
                   />
                 </div>
               </div>

               <div className="relative z-50" ref={locationDropdownRef}>
                 <button
                   onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                   className="w-full flex items-center justify-between pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 text-lg font-medium cursor-pointer"
                 >
                   <MapPin className="absolute left-4 text-gray-600 w-5 h-5" />
                   <span className="truncate">
                     {getDisplayLabel(locations, selectedLocation, 'Any Location')}
                   </span>
                   <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                 </button>
                 
                 {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 z-[9999] shadow-xl max-h-60 overflow-y-auto">
                      {locations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => {
                            setSelectedLocation(location.id);
                            setIsLocationDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors"
                        >
                          {location.label}
                        </button>
                      ))}
                    </div>
                  )}
               </div>

               <div>
                 <button
                   onClick={handleSearch}
                   className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                 >
                   Search
                 </button>
               </div>
             </div>

             <div className="mt-6 text-center">
               <button
                 onClick={() => setShowAdvanced(!showAdvanced)}
                 className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-all duration-300"
               >
                 <Filter className="w-4 h-4" />
                 {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
               </button>
             </div>

             {showAdvanced && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 transition={{ duration: 0.3 }}
                 className="mt-6 pt-6 border-t border-white/20"
               >
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative z-50" ref={categoryDropdownRef}>
                     <label className="block text-white/90 text-sm font-semibold mb-2">Category</label>
                     <button
                       onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                       className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium cursor-pointer"
                     >
                       <span className="truncate">
                         {getDisplayLabel(categories, selectedCategory, 'All Categories')}
                       </span>
                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                     </button>
                     
                     {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 z-[9999] shadow-xl max-h-60 overflow-y-auto">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.id);
                                setIsCategoryDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      )}
                   </div>

                    <div className="relative z-50" ref={durationDropdownRef}>
                     <label className="block text-white/90 text-sm font-semibold mb-2">Duration</label>
                     <button
                       onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
                       className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium cursor-pointer"
                     >
                       <span className="truncate">Any Duration</span>
                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDurationDropdownOpen ? 'rotate-180' : ''}`} />
                     </button>
                     
                     {isDurationDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 z-[9999] shadow-xl max-h-60 overflow-y-auto">
                          {durations.map((duration) => (
                            <button
                              key={duration.id}
                              onClick={() => {
                                setIsDurationDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                            >
                              {duration.label}
                            </button>
                          ))}
                        </div>
                      )}
                   </div>

                    <div className="relative z-50" ref={budgetDropdownRef}>
                     <label className="block text-white/90 text-sm font-semibold mb-2">Budget</label>
                     <button
                       onClick={() => setIsBudgetDropdownOpen(!isBudgetDropdownOpen)}
                       className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-medium cursor-pointer"
                     >
                       <span className="truncate">Any Budget</span>
                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isBudgetDropdownOpen ? 'rotate-180' : ''}`} />
                     </button>
                     
                     {isBudgetDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 z-[9999] shadow-xl max-h-60 overflow-y-auto">
                          {budgets.map((budget) => (
                            <button
                              key={budget.id}
                              onClick={() => {
                                setIsBudgetDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                            >
                              {budget.label}
                            </button>
                          ))}
                        </div>
                      )}
                   </div>
                 </div>
               </motion.div>
             )}
           </div>
         </motion.div> */}

                 {/* CTA Buttons */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-10"
         >
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Explore Tours
          </button>
          <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20">
            View Experiences
          </button>
        </motion.div>

                 {/* Stats */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-10"
         >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <Star className="w-6 h-6 text-yellow-400" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <Compass className="w-6 h-6 text-blue-400" />
        </div>
      </motion.div>
    </section>
  );
};

export default ToursHero;
