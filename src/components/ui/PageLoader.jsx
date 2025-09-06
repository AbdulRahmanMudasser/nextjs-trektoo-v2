import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

export const PageLoader = ({
  message = 'Loading...',
  showBackground = true,
  variant = 'default',
  className = '',
}) => {
  const backgroundVariants = {
    default: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
    minimal: 'bg-white',
    dark: 'bg-gray-900',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  if (variant === 'minimal') {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${className}`}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <LoadingSpinner size="lg" message={message} />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${showBackground ? backgroundVariants[variant] : ''} flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      {showBackground && variant === 'default' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
          </div>
        </>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        <motion.div
          variants={contentVariants}
          className="max-w-md mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50"
        >
          <LoadingSpinner size="xl" message={message} />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Preset page loaders for common use cases
export const AuthPageLoader = ({ message = 'Loading...' }) => (
  <PageLoader message={message} variant="default" className="pt-24 pb-16" />
);

export const DashboardPageLoader = ({ message = 'Loading dashboard...' }) => (
  <PageLoader message={message} variant="blue" />
);

export const CheckoutPageLoader = ({ message = 'Loading checkout...' }) => (
  <PageLoader message={message} variant="default" className="pt-24 pb-16" />
);

export const MinimalPageLoader = ({ message = 'Loading...' }) => (
  <PageLoader message={message} variant="minimal" />
);
