'use client';

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';

const Map = ({
  lat = null,
  lng = null,
  zoom = 10,
  address = '',
  hotelName = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [useFallbackMap, setUseFallbackMap] = useState(false);
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
        console.warn('Iframe support check failed:', error);
        setIframeError(true);
      }
    };

    checkIframeSupport();

    // Add timeout to detect if iframe is blocked
    const timeout = setTimeout(() => {
      if (!mapLoaded) {
        console.warn('Map iframe failed to load within timeout');
        setIframeError(true);
      }
    }, 8000); // 8 seconds timeout

    return () => clearTimeout(timeout);
  }, [mapLoaded]);

  // Use fallback coordinates if none provided (Paris coordinates as example)
  const fallbackLat = 48.8566;
  const fallbackLng = 2.3522;

  // Robust coordinate validation and fallback
  const isValidCoordinate = (coord) => {
    if (coord === null || coord === undefined) return false;
    const num = parseFloat(coord);
    return !isNaN(num) && num !== 0 && num >= -90 && num <= 90;
  };

  const mapLat = isValidCoordinate(lat) ? parseFloat(lat) : fallbackLat;
  const mapLng = isValidCoordinate(lng) ? parseFloat(lng) : fallbackLng;
  const mapZoom = parseInt(zoom) || 10;

  // Check if we're using fallback coordinates
  const usingFallback = !isValidCoordinate(lat) || !isValidCoordinate(lng);

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
    const googleMapsUrl = `https://www.google.com/maps/place/${mapLat},${mapLng}/@${mapLat},${mapLng},${mapZoom}z`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleViewOnOpenStreetMap = () => {
    const osmUrl = `https://www.openstreetmap.org/?mlat=${mapLat}&mlon=${mapLng}&zoom=${mapZoom}#map=${mapZoom}/${mapLat}/${mapLng}`;
    window.open(osmUrl, '_blank');
  };

  const handleCopyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(`${mapLat}, ${mapLng}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy coordinates:', error);
    }
  };

  // Generate map URL with fallback
  const getMapUrl = () => {
    if (useFallbackMap) {
      // Use Google Maps embed as fallback
      const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (googleMapsApiKey) {
        return `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${mapLat},${mapLng}&zoom=${mapZoom}`;
      } else {
        // Fallback to Mapbox static image if Google Maps API key is not available
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (mapboxToken) {
          return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${mapLng},${mapLat})/${mapLng},${mapLat},${mapZoom},0/600x400@2x?access_token=${mapboxToken}`;
        } else {
          // Final fallback: return a simple placeholder
          return `data:image/svg+xml;base64,${btoa(`
            <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f3f4f6"/>
              <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
                Map unavailable - API key required
              </text>
            </svg>
          `)}`;
        }
      }
    } else {
      // Use OpenStreetMap
      return `https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.01},${mapLat - 0.01},${mapLng + 0.01},${mapLat + 0.01}&layer=mapnik&marker=${mapLat},${mapLng}`;
    }
  };

  const handleMapError = () => {
    console.warn('Primary map failed, trying fallback');
    if (!useFallbackMap) {
      setUseFallbackMap(true);
      setMapLoaded(false);
      setIframeError(false);
    } else {
      setIframeError(true);
    }
  };

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
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
          {usingFallback
            ? 'Interactive map showing approximate location (exact coordinates not available)'
            : 'Find us easily with our interactive map and detailed location information'}
        </p>
        {usingFallback && (
          <p className="text-xs text-orange-600 mt-2">
            Note: This is a sample location. Hotel coordinates are not
            available.
          </p>
        )}
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
                <span className="sm:hidden">{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Map Content */}
        <div className="p-4 sm:p-6">
          {iframeError ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Map Unavailable
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Interactive map cannot be displayed at this time.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <motion.button
                  onClick={handleViewOnGoogleMaps}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">Google Maps</span>
                  <span className="sm:hidden">Maps</span>
                </motion.button>
                <motion.button
                  onClick={handleViewOnOpenStreetMap}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">OpenStreetMap</span>
                  <span className="sm:hidden">OSM</span>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <iframe
                ref={mapRef}
                src={getMapUrl()}
                width="100%"
                height="400"
                className="rounded-lg border-0"
                onLoad={() => {
                  console.log('Map iframe loaded successfully');
                  setMapLoaded(true);
                  setIframeError(false);
                }}
                onError={(e) => {
                  console.error('Map iframe failed to load:', e);
                  handleMapError();
                }}
                title={`Map showing location of ${hotelName}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
              {!mapLoaded && !iframeError && (
                <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {useFallbackMap
                        ? 'Loading fallback map...'
                        : 'Loading map...'}
                    </p>
                  </div>
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
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">View on Google Maps</span>
          <span className="sm:hidden">Google Maps</span>
        </motion.button>
      </motion.div>
    </motion.div>
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
