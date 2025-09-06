import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';

export const LoadingSpinner = ({
  size = 'md',
  message = '',
  variant = 'spinner',
  className = '',
  showMessage = true,
  color = 'blue-500',
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const colorClasses = {
    'blue-500': 'border-blue-500 text-blue-500',
    white: 'border-white text-white',
    'gray-500': 'border-gray-500 text-gray-500',
    'green-500': 'border-green-500 text-green-500',
    'red-500': 'border-red-500 text-red-500',
  };

  const renderSpinner = () => {
    if (variant === 'icon') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${sizeClasses[size]} ${colorClasses[color]}`}
        >
          <Loader2 className="w-full h-full" />
        </motion.div>
      );
    }

    if (variant === 'refresh') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${sizeClasses[size]} ${colorClasses[color]}`}
        >
          <RefreshCw className="w-full h-full" />
        </motion.div>
      );
    }

    // Default spinner variant
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-${color.split('-')[1]} rounded-full`}
      />
    );
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        {renderSpinner()}
        {showMessage && message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${textSizeClasses[size]} text-gray-600 font-medium`}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

// Preset loading components for common use cases
export const PageLoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" message={message} />
    </div>
  </div>
);

export const ButtonLoadingSpinner = ({ size = 'sm' }) => (
  <LoadingSpinner size={size} variant="icon" showMessage={false} />
);

export const InlineLoadingSpinner = ({
  message = 'Loading...',
  size = 'md',
}) => <LoadingSpinner size={size} message={message} />;

export const CardLoadingSpinner = ({ message = 'Loading content...' }) => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner size="lg" message={message} />
  </div>
);
