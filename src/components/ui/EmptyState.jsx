import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({
  icon: Icon,
  title,
  subtitle,
  action,
  loading = false,
  className = '',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // For SSR compatibility, render without animations initially
  if (!isClient) {
    return (
      <div className={`text-center py-12 ${className}`}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">{title}</span>
          </div>
        ) : (
          <>
            {Icon && (
              <div className="mb-4">
                <Icon className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
            {action && <div>{action}</div>}
          </>
        )}
      </div>
    );
  }

  // Client-side rendering with animations
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-12 ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">{title}</span>
        </div>
      ) : (
        <>
          {Icon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-4"
            >
              <Icon className="w-16 h-16 text-gray-300 mx-auto" />
            </motion.div>
          )}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-xl font-semibold text-gray-900 mb-2"
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-gray-600 mb-6"
            >
              {subtitle}
            </motion.p>
          )}
          {action && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {action}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default EmptyState;
