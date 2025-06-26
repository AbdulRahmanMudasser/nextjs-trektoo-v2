'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * ErrorBoundary component to catch and display runtime errors
 */
export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl my-12 border border-blue-50"
        >
          <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
            Something Went Wrong
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            An unexpected error occurred. Please try refreshing the page or
            contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-blue-500 text-white text-sm font-medium uppercase rounded-xl hover:bg-blue-600 transition-colors"
          >
            Refresh Page
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
