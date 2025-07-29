import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProfileHeader = ({ 
  formData, 
  bookings, 
  avatarError, 
  setAvatarError, 
  itemVariants 
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative mb-12 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="relative group/avatar"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {formData.avatar_id && !avatarError ? (
              <Image
                src={`/avatars/${formData.avatar_id}.jpg`}
                alt="Profile picture"
                width={120}
                height={120}
                className="relative rounded-full border-4 border-blue-500/20 shadow-xl object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="relative h-32 w-32 rounded-full border-4 border-blue-500/20 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <motion.button
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ring-4 ring-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Edit profile picture"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                />
              </svg>
            </motion.button>
          </motion.div>

          <div className="text-center lg:text-left flex-1">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 tracking-tight font-montserrat">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
              Premium Member since{' '}
              {formData.created_at
                ? new Date(formData.created_at).getFullYear()
                : 'N/A'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-semibold shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  {formData.status === 'publish' ? 'Premium' : 'Standard'} Member
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md text-gray-700 px-8 py-3 rounded-2xl text-sm font-semibold border border-gray-200 shadow-md">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {bookings.length} Total Bookings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};