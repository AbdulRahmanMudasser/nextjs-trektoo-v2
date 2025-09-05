import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { User, Calendar, CreditCard, Edit3, Save, X } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

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
      {/* Clean Navigation */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-2">
          <nav className="flex" aria-label="Profile tabs">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 flex-1 justify-center rounded-2xl ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <PersonalTab
                formData={formData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
              />
            )}
            {activeTab === 'bookings' && (
              <BookingsTab
                bookings={bookings}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                loading={loading}
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
  handleInputChange,
  handleSave,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            isEditing
              ? 'bg-gray-500 text-white hover:bg-gray-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? (
            <X className="w-4 h-4" />
          ) : (
            <Edit3 className="w-4 h-4" />
          )}
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mt-6"
        >
          <motion.button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Bookings Tab Component
const BookingsTab = ({
  bookings,
  currentPage,
  totalPages,
  handlePageChange,
  loading,
}) => {
  if (loading) {
    return <EmptyState loading={true} title="Loading bookings..." />;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Bookings Yet"
        subtitle="Start exploring and book your next adventure!"
        action={
          <Link
            href="/hotels-list"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-300"
          >
            Browse Hotels
          </Link>
        }
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {booking.hotel_name || 'Hotel Name'}
                </h3>
                <p className="text-sm text-gray-600">
                  {booking.check_in && booking.check_out
                    ? `${new Date(booking.check_in).toLocaleDateString()} - ${new Date(booking.check_out).toLocaleDateString()}`
                    : 'Dates not available'}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.guests
                    ? `${booking.guests} guests`
                    : 'Guest info not available'}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <span className="text-lg font-bold text-blue-600">
                  ${booking.total_amount || '0.00'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking.status || 'Pending'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Payments Tab Component
const PaymentsTab = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No Payment History"
        subtitle="Your payment history will appear here."
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
      <div className="space-y-4">
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {payment.description || 'Payment'}
                </h3>
                <p className="text-sm text-gray-600">
                  {payment.date
                    ? new Date(payment.date).toLocaleDateString()
                    : 'Date not available'}
                </p>
                <p className="text-sm text-gray-500">
                  {payment.method || 'Payment method not specified'}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <span className="text-lg font-bold text-green-600">
                  ${payment.amount || '0.00'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {payment.status || 'Pending'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};