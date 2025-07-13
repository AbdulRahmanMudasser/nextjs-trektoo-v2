'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { getUserProfile, updateUserProfile } from '@/lib/api/authApi';

const ProfilePage = () => {
  const { isAuthenticated, token } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    created_at: '',
    avatar_id: null,
    status: 'publish',
  });
  const [loading, setLoading] = useState(true);

  // Mock data for bookings and payments
  const bookings = [
    {
      id: 1,
      destination: 'Paris',
      date: '2025-08-15',
      status: 'Upcoming',
      price: 1200,
      image: '/paris.jpg',
    },
    {
      id: 2,
      destination: 'Tokyo',
      date: '2025-06-20',
      status: 'Completed',
      price: 1800,
      image: '/tokyo.jpg',
    },
  ];

  const payments = [
    {
      id: 1,
      date: '2025-05-10',
      amount: 1200,
      method: 'Visa **** 1234',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-03-15',
      amount: 1800,
      method: 'Mastercard **** 5678',
      status: 'Completed',
    },
  ];

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getUserProfile(token);
        const { data, status } = response;
        if (status === 1 && data) {
          setFormData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            country: data.country || '',
            created_at: data.created_at || '',
            avatar_id: data.avatar_id || null,
            status: data.status || 'publish',
          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        toast.error(error.message, { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email, // Required by API but not editable
          phone: formData.phone,
          address: formData.address,
          country: formData.country,
        },
        token
      );
      const { status } = response;
      if (status === 1) {
        toast.success('Profile updated successfully', {
          position: 'top-right',
        });
        setIsEditing(false);
      } else {
        throw new Error(
          Object.values(response.message || {})
            .flat()
            .join(', ') || 'Failed to update profile'
        );
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'personal',
      label: 'Profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Log in to access your profile and bookings.
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-semibold text-lg shadow-md"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-screen-xl mx-auto"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={
                    formData.avatar_id
                      ? `/avatars/${formData.avatar_id}.jpg`
                      : '/default-avatar.png'
                  }
                  alt="Profile picture"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
                <button
                  className="absolute bottom-0 right-0 bg-white text-blue-500 rounded-full p-2 shadow-md hover:bg-blue-100 transition-all duration-300"
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
                </button>
              </motion.div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-blue-100 text-lg mt-2">
                  Member since{' '}
                  {formData.created_at
                    ? new Date(formData.created_at).getFullYear()
                    : 'N/A'}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="bg-white text-blue-500 px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {formData.status === 'publish' ? 'Active' : 'Standard'}{' '}
                    Member
                  </span>
                  <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {bookings.length} Total Trips
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
            <nav
              className="flex justify-center gap-6 px-6 py-4"
              aria-label="Profile tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
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
                      d={tab.icon}
                    />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Personal Information
                    </h2>
                    {isEditing ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2"
                            aria-required="true"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2"
                            aria-required="true"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="mt-1 w-full rounded-lg border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed py-2"
                            aria-disabled="true"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold ${
                              loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {loading ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-900 text-lg">
                          <strong>Name:</strong> {formData.firstName}{' '}
                          {formData.lastName}
                        </p>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-all duration-200"
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
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4 text-lg">
                      <p className="text-gray-900">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="text-gray-900">
                        <strong>Phone:</strong>{' '}
                        {formData.phone || 'Not provided'}
                      </p>
                      <p className="text-gray-900">
                        <strong>Address:</strong>{' '}
                        {formData.address || 'Not provided'}
                      </p>
                      <p className="text-gray-900">
                        <strong>Country:</strong>{' '}
                        {formData.country || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Your Bookings
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-40">
                          <Image
                            src={booking.image}
                            alt={booking.destination}
                            layout="fill"
                            objectFit="cover"
                            className="brightness-75"
                          />
                          <span
                            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${
                              booking.status === 'Upcoming'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {booking.destination}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Date: {booking.date}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-lg font-bold text-blue-500">
                              ${booking.price}
                            </p>
                            <Link
                              href={`/booking/${booking.id}`}
                              className="text-blue-500 hover:text-blue-600 font-semibold transition-all duration-200"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment History
                  </h2>
                  <div className="space-y-6">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-white rounded-2xl p-6 shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                            <p className="text-gray-600">
                              Date: {payment.date}
                            </p>
                            <p className="text-gray-600">
                              Method: {payment.method}
                            </p>
                            <p className="text-gray-600">
                              Status: {payment.status}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-blue-500">
                            ${payment.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
