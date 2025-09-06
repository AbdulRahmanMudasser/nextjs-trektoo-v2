import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LoadingButton = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  className = '',
  disabled = false,
  variant = 'default',
  size = 'default',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

  const variantClasses = {
    default:
      'bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-50',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    custom: '', // Custom variant allows full className control
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-9 px-4 py-2',
    lg: 'h-10 px-6 text-base',
    xl: 'h-12 px-8 text-lg',
    custom: '', // Custom size allows full className control
  };

  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {loadingText}
          </motion.span>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </motion.button>
  );
};

// Preset button components for common use cases
export const SubmitButton = ({
  loading,
  loadingText = 'Submitting...',
  children,
  ...props
}) => (
  <LoadingButton
    loading={loading}
    loadingText={loadingText}
    variant="default"
    size="lg"
    className="w-full"
    {...props}
  >
    {children}
  </LoadingButton>
);

export const SearchButton = ({
  loading,
  loadingText = 'Searching...',
  children,
  ...props
}) => (
  <LoadingButton
    loading={loading}
    loadingText={loadingText}
    variant="default"
    size="default"
    {...props}
  >
    {children}
  </LoadingButton>
);

export const ActionButton = ({
  loading,
  loadingText = 'Processing...',
  children,
  ...props
}) => (
  <LoadingButton
    loading={loading}
    loadingText={loadingText}
    variant="outline"
    size="sm"
    {...props}
  >
    {children}
  </LoadingButton>
);
