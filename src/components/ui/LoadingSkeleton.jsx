import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonBase = ({ className = '', children, ...props }) => (
  <motion.div
    className={`bg-gray-200 rounded animate-pulse ${className}`}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    {...props}
  >
    {children}
  </motion.div>
);

// Card skeleton for hotel/activity cards
export const CardSkeleton = ({ className = '' }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    <SkeletonBase className="h-48 w-full" />
    <div className="p-4 space-y-3">
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-3 w-1/2" />
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-6 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

// List item skeleton
export const ListItemSkeleton = ({ className = '' }) => (
  <div className={`flex items-center space-x-4 p-4 ${className}`}>
    <SkeletonBase className="h-12 w-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-3 w-1/2" />
    </div>
    <SkeletonBase className="h-8 w-20 rounded" />
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {/* Header */}
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonBase key={i} className="h-4 w-full" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonBase key={colIndex} className="h-3 w-full" />
        ))}
      </div>
    ))}
  </div>
);

// Profile skeleton
export const ProfileSkeleton = ({ className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    <div className="flex items-center space-x-4">
      <SkeletonBase className="h-20 w-20 rounded-full" />
      <div className="space-y-2">
        <SkeletonBase className="h-6 w-48" />
        <SkeletonBase className="h-4 w-32" />
      </div>
    </div>
    <div className="space-y-4">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-4 w-1/2" />
    </div>
  </div>
);

// Form skeleton
export const FormSkeleton = ({ fields = 4, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <SkeletonBase className="h-4 w-24" />
        <SkeletonBase className="h-10 w-full rounded" />
      </div>
    ))}
    <SkeletonBase className="h-12 w-32 rounded" />
  </div>
);

// Hotel detail skeleton
export const HotelDetailSkeleton = ({ className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    {/* Header */}
    <div className="space-y-4">
      <SkeletonBase className="h-8 w-3/4" />
      <SkeletonBase className="h-4 w-1/2" />
      <div className="flex space-x-2">
        <SkeletonBase className="h-6 w-16 rounded-full" />
        <SkeletonBase className="h-6 w-20 rounded-full" />
      </div>
    </div>

    {/* Image Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SkeletonBase className="h-64 w-full md:col-span-2" />
      <div className="space-y-2">
        <SkeletonBase className="h-32 w-full" />
        <SkeletonBase className="h-32 w-full" />
      </div>
    </div>

    {/* Details */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <SkeletonBase className="h-6 w-1/3" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-2/3" />
      </div>
      <div className="space-y-4">
        <SkeletonBase className="h-32 w-full rounded-xl" />
        <SkeletonBase className="h-12 w-full rounded" />
      </div>
    </div>
  </div>
);

// Activity grid skeleton
export const ActivityGridSkeleton = ({ items = 6, className = '' }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}
  >
    {Array.from({ length: items }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Hotel list skeleton
export const HotelListSkeleton = ({ items = 5, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
      >
        <div className="flex space-x-4">
          <SkeletonBase className="h-24 w-24 rounded-lg" />
          <div className="flex-1 space-y-2">
            <SkeletonBase className="h-5 w-3/4" />
            <SkeletonBase className="h-4 w-1/2" />
            <div className="flex justify-between items-center">
              <SkeletonBase className="h-4 w-20" />
              <SkeletonBase className="h-8 w-24 rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
