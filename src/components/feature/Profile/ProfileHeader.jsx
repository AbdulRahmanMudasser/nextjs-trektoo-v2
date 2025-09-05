import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export const ProfileHeader = ({ 
  formData, 
  bookings, 
  avatarError, 
  setAvatarError, 
  itemVariants,
}) => {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Avatar Section */}
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
              <div className="relative h-24 w-24 rounded-full border-4 border-blue-500/20 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
            )}
            <motion.button
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-2 shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ring-4 ring-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Edit profile picture"
            >
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Profile Info */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Welcome back to your account
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="font-medium">
                  {formData.phone || 'Not provided'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 md:col-span-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="font-medium">
                  {formData.address || 'Not provided'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">
                    {bookings?.length || 0} Bookings
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Member since{' '}
              {formData.created_at
                ? new Date(formData.created_at).getFullYear()
                : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
