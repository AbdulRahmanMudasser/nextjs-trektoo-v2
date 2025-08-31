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
      className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Location & Directions
          </h2>
        </motion.div>

        {/* Main Content */}
                 <motion.div
           className="rounded-3xl border border-gray-100 overflow-hidden"
           variants={itemVariants}
         >
          {/* Hotel Location Info */}
          <div className="p-8 border-b border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                Hotel Location
              </h3>

              {hotelName && (
                                 <div className="p-6 rounded-2xl border border-blue-100 mb-6 max-w-2xl mx-auto">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {hotelName}
                  </h4>
                  {address && (
                    <p className="text-gray-700 text-lg">{address}</p>
                  )}
                </div>
              )}

                             <div className="p-4 rounded-xl border border-gray-200 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 text-left">
                    <p>
                      <strong>Latitude:</strong> {lat}
                    </p>
                    <p>
                      <strong>Longitude:</strong> {lng}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleCopyCoordinates}
                    className="flex items-center space-x-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all text-sm ml-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Static Map Display */}
          <div className="p-8">
                         <motion.div
               className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-200"
               variants={itemVariants}
               whileHover={{ scale: 1.01 }}
               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
             >
                             {/* OpenStreetMap Integration with Fallback */}
               <div className="relative w-full h-full">
                 {!iframeError ? (
                   <iframe
                     src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`}
                     width="100%"
                     height="100%"
                     frameBorder="0"
                     scrolling="no"
                     marginHeight="0"
                     marginWidth="0"
                     title={`OpenStreetMap showing ${hotelName || 'hotel location'}`}
                     className="w-full h-full rounded-2xl"
                     onLoad={() => setMapLoaded(true)}
                     onError={() => setIframeError(true)}
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center rounded-2xl">
                     <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200 max-w-md">
                       <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                       <h3 className="text-xl font-bold text-gray-900 mb-2">
                         {hotelName || 'Hotel Location'}
                       </h3>
                       <p className="text-gray-600 mb-2">{address}</p>
                       <p className="text-sm text-gray-500 mb-4">
                         Coordinates: {lat}, {lng}
                       </p>
                       <div className="flex gap-2 justify-center">
                         <button
                           onClick={handleViewOnOpenStreetMap}
                           className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                         >
                           View on OpenStreetMap
                         </button>
                         <button
                           onClick={handleViewOnGoogleMaps}
                           className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                         >
                           View on Google Maps
                         </button>
                       </div>
                     </div>
                   </div>
                 )}

                {/* Map Loading Overlay */}
                                 {!mapLoaded && (
                   <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                    <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Loading Map...
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Please wait while we load the location
                      </p>
                    </div>
                  </div>
                )}
                
                                 {/* Info Overlay on Hover */}
                 <div className="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200">
                    <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {hotelName || 'Hotel Location'}
                    </h3>
                    <p className="text-gray-600 mb-2">{address}</p>
                    <p className="text-sm text-gray-500">
                      Coordinates: {lat}, {lng}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overlay buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  onClick={handleViewOnGoogleMaps}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="View on Google Maps"
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={handleViewOnOpenStreetMap}
                  className="bg-green-500/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-green-500 hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="View on OpenStreetMap"
                >
                  <MapPin className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

                                                   {/* Map Info */}
              <div className="text-center mb-6">
                {iframeError && (
                  <p className="text-sm text-gray-600">
                    <span className="block text-blue-600">
                      🔒 <strong>Note:</strong> Using fallback view due to security restrictions. Click the buttons below to view on external maps.
                    </span>
                  </p>
                )}
              </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <motion.button
                onClick={handleViewOnOpenStreetMap}
                className="flex items-center justify-center space-x-2 bg-green-500 text-white font-medium py-3 px-4 rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="h-4 w-4" />
                <span>View on OpenStreetMap</span>
              </motion.button>

              <motion.button
                onClick={handleViewOnGoogleMaps}
                className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on Google Maps</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
           <motion.div
             className="p-6 rounded-2xl border border-gray-100 text-center"
             variants={itemVariants}
             whileHover={{ y: -5 }}
           >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Precise Location
            </h3>
            <p className="text-gray-600 text-sm">
              GPS coordinates provided for accurate navigation
            </p>
          </motion.div>

                     <motion.div
             className="p-6 rounded-2xl border border-gray-100 text-center"
             variants={itemVariants}
             whileHover={{ y: -5 }}
           >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Interactive Map
            </h3>
            <p className="text-gray-600 text-sm">
              Embedded OpenStreetMap with real-time navigation
            </p>
          </motion.div>
        </div>
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
