import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const ProfileContent = ({
  activeTab,
  setActiveTab,
  tabs,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  bookings,
  payments,
  currentPage,
  totalPages,
  loading,
  itemVariants,
  floatingAnimation,
  handleInputChange,
  handleSave,
  handlePageChange,
}) => {
  return (
    <>
      {/* Premium Navigation */}
      <motion.div variants={itemVariants} className="relative mb-12 group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <nav className="flex justify-center" aria-label="Profile tabs">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-8 py-6 text-lg font-semibold transition-all duration-500 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-2xl m-2 shadow-xl`}
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={tab.icon}
                    />
                  </svg>
                  {tab.label}
                </div>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Premium Content */}
      <motion.div variants={itemVariants} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-blue-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <PersonalTab
                formData={formData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                loading={loading}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
              />
            )}

            {activeTab === 'bookings' && (
              <BookingsTab
                bookings={bookings}
                currentPage={currentPage}
                totalPages={totalPages}
                floatingAnimation={floatingAnimation}
                handlePageChange={handlePageChange}
              />
            )}

            {activeTab === 'payments' && <PaymentsTab payments={payments} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

// Personal Tab Component
const PersonalTab = ({
  formData,
  isEditing,
  setIsEditing,
  loading,
  handleInputChange,
  handleSave,
}) => (
  <motion.div
    key="personal"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    className="grid grid-cols-1 xl:grid-cols-2 gap-12"
  >
    {/* Personal Information Card */}
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-xl border border-blue-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-montserrat">
            Personal Information
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-8">
          {[
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              disabled: true,
            },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'address', label: 'Address', type: 'text' },
            { name: 'country', label: 'Country', type: 'text' },
          ].map((field) => (
            <div key={field.name} className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                disabled={field.disabled}
                className={`w-full rounded-2xl border-2 px-6 py-4 text-lg transition-all duration-300 ${
                  field.disabled
                    ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300'
                }`}
                required={field.required}
              />
            </div>
          ))}
          <div className="flex gap-6 pt-6">
            <motion.button
              onClick={handleSave}
              disabled={loading}
              className={`flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-xl text-lg ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-2xl hover:-translate-y-1'
              }`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-white text-gray-700 px-8 py-4 rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg text-lg"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg">
            <p className="text-2xl text-gray-900 font-semibold">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="text-gray-600 mt-2">Complete Profile</p>
          </div>
          <motion.button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-all duration-300 group"
            whileHover={{ x: 5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-700 transition-all shadow-md">
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
            </div>
            Edit Profile Information
          </motion.button>
        </div>
      )}
    </div>

    {/* Contact Information Card */}
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 shadow-xl border border-emerald-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-montserrat">
            Contact Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2"></div>
        </div>
      </div>
      <div className="space-y-6">
        {[
          {
            label: 'Email Address',
            value: formData.email,
            icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            gradient: 'from-blue-500 to-cyan-600',
          },
          {
            label: 'Phone Number',
            value: formData.phone || 'Not provided',
            icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
            gradient: 'from-emerald-500 to-teal-600',
          },
          {
            label: 'Address',
            value: formData.address || 'Not provided',
            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
            gradient: 'from-purple-500 to-violet-600',
          },
          {
            label: 'Country',
            value: formData.country || 'Not provided',
            icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
            gradient: 'from-orange-500 to-red-600',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg"
          >
            <div
              className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md`}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-lg text-gray-900 font-medium">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Bookings Tab Component
const BookingsTab = ({
  bookings,
  currentPage,
  totalPages,
  floatingAnimation,
  handlePageChange,
}) => (
  <motion.div
    key="bookings"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
  >
    <div className="flex items-center gap-4 mb-12">
      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
        <svg
          className="w-7 h-7 text-white"
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
      </div>
      <div>
        <h2 className="text-4xl font-bold text-gray-900 font-montserrat">
          Your Bookings
        </h2>
        <p className="text-gray-600 text-lg mt-1">
          Manage and track your reservations
        </p>
      </div>
    </div>

    {bookings.length === 0 ? (
      <div className="text-center py-20">
        <motion.div
          animate={floatingAnimation}
          className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <svg
            className="w-12 h-12 text-emerald-600"
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
        </motion.div>
        <p className="text-2xl text-gray-700 font-medium mb-2">
          No bookings found
        </p>
        <p className="text-gray-500">
          Start exploring and make your first reservation
        </p>
      </div>
    ) : (
      <>
        <div className="grid gap-8">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              className="relative group/booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl group-hover/booking:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 group-hover/booking:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-montserrat">
                          {booking.service.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                              booking.status === 'unpaid'
                                ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                booking.status === 'unpaid'
                                  ? 'bg-orange-500'
                                  : 'bg-white animate-pulse'
                              }`}
                            ></div>
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">
                          ${booking.total}
                        </p>
                        <p className="text-gray-600 text-sm">Total Amount</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 shadow-sm">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                              Check-in
                            </p>
                            <p className="text-blue-900 font-medium">
                              {new Date(
                                booking.start_date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 shadow-sm">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                              Check-out
                            </p>
                            <p className="text-emerald-900 font-medium">
                              {new Date(booking.end_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 shadow-sm">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                              Guests
                            </p>
                            <p className="text-purple-900 font-medium">
                              {booking.total_guests} Total (
                              {booking.booking_meta.adults} Adults,{' '}
                              {booking.booking_meta.children} Children)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 shadow-sm">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                              Location
                            </p>
                            <p className="text-orange-900 font-medium">
                              {booking.country || 'Not specified'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.buyer_fees && booking.buyer_fees.length > 0 && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                          Additional Fees
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {booking.buyer_fees.map((fee, feeIndex) => (
                            <span
                              key={feeIndex}
                              className="bg-white text-gray-700 px-3 py-1 rounded-lg text-sm font-medium border border-gray-200 shadow-sm"
                            >
                              {fee.name}: ${fee.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="xl:border-l xl:border-gray-200 xl:pl-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        Booking Date
                      </p>
                      <p className="text-gray-900 font-medium mb-6">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/booking/${booking.id}`}
                        className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                      >
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 ml-2 group-hover/booking:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-4 border border-white/50 flex items-center gap-3">
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
                }`}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <motion.button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
                }`}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        )}
      </>
    )}
  </motion.div>
);

// Payments Tab Component
const PaymentsTab = ({ payments }) => (
  <motion.div
    key="payments"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
  >
    <div className="flex items-center gap-4 mb-12">
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-gray-900 font-montserrat">
          Payment History
        </h2>
        <p className="text-gray-600 text-lg mt-1">
          Track your transaction history
        </p>
      </div>
    </div>

    <div className="grid gap-6">
      {payments.map((payment, index) => (
        <motion.div
          key={payment.id}
          className="relative group/payment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-3xl blur-xl group-hover/payment:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 group-hover/payment:shadow-2xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction Date
                    </p>
                    <p className="text-lg text-gray-900 font-medium">
                      {payment.date}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </p>
                    <p className="text-lg text-gray-900 font-medium">
                      {payment.method}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </p>
                    <div className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      {payment.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">
                  ${payment.amount.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">Payment Amount</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
