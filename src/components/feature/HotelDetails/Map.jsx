'use client';

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';

const Map = ({ lat = 0, lng = 0, zoom = 10, address = '', hotelName = '' }) => {
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const mapRef = useRef(null);

  // Check if iframe is blocked by CSP and add timeout
  useEffect(() => {
    const checkIframeSupport = () => {
      try {
        const testIframe = document.createElement('iframe');
        testIframe.src = 'about:blank';
        document.body.appendChild(testIframe);
        document.body.removeChild(testIframe);
      } catch (error) {
        setIframeError(true);
      }
    };

    checkIframeSupport();

    // Add timeout to detect if iframe is blocked
    const timeout = setTimeout(() => {
      if (!mapLoaded) {
        setIframeError(true);
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeout);
  }, [mapLoaded]);

  // Don't render if no valid coordinates
  if (!lat || !lng || (lat === 0 && lng === 0)) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25,
      },
    },
  };

  const handleViewOnGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},${zoom}z`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleViewOnOpenStreetMap = () => {
    const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=${zoom}#map=${zoom}/${lat}/${lng}`;
    window.open(osmUrl, '_blank');
  };

  const handleCopyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(`${lat}, ${lng}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy coordinates:', error);
    }
  };

  return (
    <motion.section
      className="w-full py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-3 sm:mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Location
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Find us easily with our interactive map and detailed location
            information
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6 sm:mb-8"
          variants={itemVariants}
        >
          {/* Map Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                  {hotelName}
                </h3>
                <p className="text-blue-100 text-sm sm:text-base break-words">
                  {address}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  onClick={handleCopyCoordinates}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copied ? 'Copied!' : 'Copy Coords'}
                  </span>
                  <span className="sm:hidden">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Map Content */}
          <div className="p-4 sm:p-6">
            {iframeError ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Map Unavailable
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  Interactive map cannot be displayed due to browser
                  restrictions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleViewOnGoogleMaps}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">
                      View on Google Maps
                    </span>
                    <span className="sm:hidden">Google Maps</span>
                  </motion.button>
                  <motion.button
                    onClick={handleViewOnOpenStreetMap}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">
                      View on OpenStreetMap
                    </span>
                    <span className="sm:hidden">OpenStreetMap</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <iframe
                  ref={mapRef}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`}
                  width="100%"
                  height="400"
                  className="rounded-lg border-0"
                  onLoad={() => setMapLoaded(true)}
                  title={`Map showing location of ${hotelName}`}
                  loading="lazy"
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleViewOnGoogleMaps}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Get Directions</span>
            <span className="sm:hidden">Directions</span>
          </motion.button>

          <motion.button
            onClick={handleViewOnGoogleMaps}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">View on Google Maps</span>
            <span className="sm:hidden">Google Maps</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
  address: PropTypes.string,
  hotelName: PropTypes.string,
};

export default Map;
