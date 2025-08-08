'use client';

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';

const Map = ({ lat = 0, lng = 0, zoom = 10, address = '', hotelName = '' }) => {
  const [copied, setCopied] = useState(false);
  const mapRef = useRef(null);

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
      <div className="max-w-7xl mx-auto">
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
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
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
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-6 max-w-2xl mx-auto">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {hotelName}
                  </h4>
                  {address && (
                    <p className="text-gray-700 text-lg">{address}</p>
                  )}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 max-w-md mx-auto">
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
              className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* OpenStreetMap Static Image (Free) */}
              <div className="relative w-full h-full">
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-hotel+285A98(${lng},${lat})/${lng},${lat},${zoom},0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZiangifQ.-g_vE53SD2WrJ6tFX7QHmA`}
                  alt={`Map showing ${hotelName || 'hotel location'}`}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    // Fallback to a simple coordinate display if map fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />

                {/* Fallback display */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl"
                  style={{ display: 'none' }}
                >
                  <div className="text-center p-8">
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
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <motion.button
                onClick={handleViewOnGoogleMaps}
                className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on Google Maps</span>
              </motion.button>

              <motion.button
                onClick={handleViewOnOpenStreetMap}
                className="flex items-center justify-center space-x-2 bg-green-50 border border-green-200 text-green-700 font-medium py-3 px-4 rounded-xl hover:bg-green-100 hover:border-green-300 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="h-4 w-4" />
                <span>View on OpenStreetMap</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center"
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
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              External Maps
            </h3>
            <p className="text-gray-600 text-sm">
              Open in Google Maps or OpenStreetMap for full features
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
