'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  getUserProfile,
  updateUserProfile,
  getBookingHistory,
} from '@/lib/api/authApi';

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
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [avatarError, setAvatarError] = useState(false);

  // Mock data for payments (no endpoint provided)
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

  // Fetch user data and booking history
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        // Fetch user profile
        const profileResponse = await getUserProfile(token);
        const { data: profileData, status: profileStatus } = profileResponse;
        if (profileStatus === 1 && profileData) {
          setFormData({
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            country: profileData.country || '',
            created_at: profileData.created_at || '',
            avatar_id: profileData.avatar_id || null,
            status: profileData.status || 'publish',
          });
        } else {
          throw new Error('Failed to fetch user data');
        }

        // Fetch booking history
        const bookingResponse = await getBookingHistory(token, currentPage);
        const {
          data: bookingData,
          status: bookingStatus,
          max_pages,
        } = bookingResponse;
        if (bookingStatus === 1 && bookingData) {
          setBookings(bookingData);
          setTotalPages(max_pages || 1);
        } else {
          throw new Error('Failed to fetch booking history');
        }
      } catch (error) {
        toast.error(error.message, { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, currentPage]);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white p-16 rounded-[2rem] shadow-2xl text-center max-w-md w-full mx-4 border border-blue-500/10"
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
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
            <h2 className="text-4xl font-bold text-blue-500 mb-4 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xl text-blue-500/70 leading-relaxed">
              Access your premium dashboard and manage your profile with ease.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-blue-500 text-white px-10 py-4 rounded-2xl hover:bg-blue-600 transition-all duration-500 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full"
          >
            <span>Continue to Dashboard</span>
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"
          />
          <p className="text-blue-500 text-xl font-medium">
            Loading your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-7xl mx-auto"
        >
          {/* Premium Header Section */}
          <div className="relative overflow-hidden">
            <div className="bg-white rounded-[2.5rem] shadow-lg p-12 border border-blue-500/20 mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {formData.avatar_id && !avatarError ? (
                    <Image
                      src={`/avatars/${formData.avatar_id}.jpg`}
                      alt="Profile picture"
                      width={120}
                      height={120}
                      className="relative rounded-full border-4 border-blue-500/20 shadow-lg object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="relative h-32 w-32 rounded-full border-4 border-blue-500/20 shadow-lg bg-blue-500 flex items-center justify-center">
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
                    className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-300 ring-2 ring-white"
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
                  <h1 className="text-5xl font-bold text-blue-500 mb-4 tracking-tight">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 font-medium">
                    Premium Member since{' '}
                    {formData.created_at
                      ? new Date(formData.created_at).getFullYear()
                      : 'N/A'}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="bg-blue-500 text-white px-8 py-3 rounded-2xl text-sm font-semibold shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {formData.status === 'publish'
                          ? 'Premium'
                          : 'Standard'}{' '}
                        Member
                      </div>
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-8 py-3 rounded-2xl text-sm font-semibold border border-gray-200">
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
          </div>

          {/* Premium Navigation */}
          <div className="bg-white rounded-[2rem] shadow-md mb-8 border border-gray-200 overflow-hidden">
            <nav className="flex justify-center" aria-label="Profile tabs">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-8 py-6 text-lg font-semibold transition-all duration-500 flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-blue-500 hover:text-blue-600'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500 rounded-2xl m-2 shadow-lg"
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

          {/* Premium Content */}
          <div className="bg-white rounded-[2.5rem] shadow-lg p-12 border border-gray-200">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-12"
                >
                  {/* Personal Information Card */}
                  <div className="bg-white rounded-[2rem] p-10 shadow-md border border-gray-200">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
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
                      <h2 className="text-3xl font-bold text-blue-500">
                        Personal Information
                      </h2>
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
                            <label className="block text-sm font-semibold text-blue-500 mb-3 uppercase tracking-wider">
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
                                  ? 'bg-blue-50 border-blue-500/20 text-blue-500/50 cursor-not-allowed'
                                  : 'border-blue-500/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-500/40'
                              }`}
                              required={field.required}
                            />
                          </div>
                        ))}
                        <div className="flex gap-6 pt-6">
                          <motion.button
                            onClick={handleSave}
                            disabled={loading}
                            className={`flex-1 bg-blue-500 text-white px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-xl text-lg ${
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
                            className="flex-1 bg-white text-blue-500 px-8 py-4 rounded-2xl border-2 border-blue-500/20 hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg text-lg"
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
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                          <p className="text-2xl text-blue-500 font-semibold">
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p className="text-gray-600 mt-2">Complete Profile</p>
                        </div>
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-3 text-blue-500 hover:text-blue-600 font-semibold text-lg transition-all duration-300 group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
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
                  <div className="bg-white rounded-[2rem] p-10 shadow-md border border-gray-200">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
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
                      <h2 className="text-3xl font-bold text-blue-500">
                        Contact Details
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {[
                        {
                          label: 'Email Address',
                          value: formData.email,
                          icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                        },
                        {
                          label: 'Phone Number',
                          value: formData.phone || 'Not provided',
                          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                        },
                        {
                          label: 'Address',
                          value: formData.address || 'Not provided',
                          icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                        },
                        {
                          label: 'Country',
                          value: formData.country || 'Not provided',
                          icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
                            <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            <p className="text-lg text-blue-500">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
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
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
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
                      <h2 className="text-4xl font-bold text-blue-500">
                        Your Bookings
                      </h2>
                      <p className="text-blue-500/70 text-lg mt-1">
                        Manage and track your reservations
                      </p>
                    </div>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg
                          className="w-12 h-12 text-blue-500/50"
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
                      <p className="text-2xl text-blue-500/70 font-medium">
                        No bookings found
                      </p>
                      <p className="text-blue-500/50 mt-2">
                        Start exploring and make your first reservation
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-8">
                        {bookings.map((booking, index) => (
                          <motion.div
                            key={booking.id}
                            className="bg-white rounded-[2rem] shadow-xl p-8 border border-blue-500/10 hover:shadow-2xl transition-all duration-500 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                          >
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                              <div className="xl:col-span-2">
                                <div className="flex items-start justify-between mb-6">
                                  <div>
                                    <h3 className="text-2xl font-bold text-blue-500 mb-2">
                                      {booking.service.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                                          booking.status === 'unpaid'
                                            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                            : 'bg-blue-500 text-white'
                                        }`}
                                      >
                                        <div
                                          className={`w-2 h-2 rounded-full mr-2 ${
                                            booking.status === 'unpaid'
                                              ? 'bg-blue-500'
                                              : 'bg-white'
                                          }`}
                                        ></div>
                                        {booking.status
                                          .charAt(0)
                                          .toUpperCase() +
                                          booking.status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-3xl font-bold text-blue-500">
                                      ${booking.total}
                                    </p>
                                    <p className="text-blue-500/70 text-sm">
                                      Total Amount
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-500/10">
                                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                          Check-in
                                        </p>
                                        <p className="text-blue-500 font-medium">
                                          {new Date(
                                            booking.start_date
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-500/10">
                                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                          Check-out
                                        </p>
                                        <p className="text-blue-500 font-medium">
                                          {new Date(
                                            booking.end_date
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-500/10">
                                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                          Guests
                                        </p>
                                        <p className="text-blue-500 font-medium">
                                          {booking.total_guests} Total (
                                          {booking.booking_meta.adults} Adults,{' '}
                                          {booking.booking_meta.children}{' '}
                                          Children)
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-500/10">
                                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                          Location
                                        </p>
                                        <p className="text-blue-500 font-medium">
                                          {booking.country || 'Not specified'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {booking.buyer_fees &&
                                  booking.buyer_fees.length > 0 && (
                                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-500/10">
                                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                                        Additional Fees
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {booking.buyer_fees.map(
                                          (fee, feeIndex) => (
                                            <span
                                              key={feeIndex}
                                              className="bg-white text-blue-500 px-3 py-1 rounded-lg text-sm font-medium border border-blue-500/20"
                                            >
                                              {fee.name}: ${fee.price}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <div className="xl:border-l xl:border-blue-500/10 xl:pl-8 flex flex-col justify-between">
                                <div>
                                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                                    Booking Date
                                  </p>
                                  <p className="text-blue-500 font-medium mb-6">
                                    {new Date(
                                      booking.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <Link
                                  href={`/booking/${booking.id}`}
                                  className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold group-hover:shadow-xl"
                                >
                                  <span>View Details</span>
                                  <svg
                                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Premium Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                          <div className="bg-white rounded-2xl shadow-xl p-3 border border-blue-500/10 flex items-center gap-3">
                            <motion.button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                currentPage === 1
                                  ? 'bg-blue-50 text-blue-300 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                              }`}
                              whileHover={{
                                scale: currentPage === 1 ? 1 : 1.05,
                              }}
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
                              {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
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
                                          ? 'bg-blue-500 text-white shadow-lg'
                                          : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                                      }`}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {page}
                                    </motion.button>
                                  );
                                }
                              )}
                            </div>

                            <motion.button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                currentPage === totalPages
                                  ? 'bg-blue-50 text-blue-300 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                              }`}
                              whileHover={{
                                scale: currentPage === totalPages ? 1 : 1.05,
                              }}
                              whileTap={{
                                scale: currentPage === totalPages ? 1 : 0.95,
                              }}
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
              )}

              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
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
                      <h2 className="text-4xl font-bold text-blue-500">
                        Payment History
                      </h2>
                      <p className="text-blue-500/70 text-lg mt-1">
                        Track your transaction history
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {payments.map((payment, index) => (
                      <motion.div
                        key={payment.id}
                        className="bg-white rounded-[2rem] p-8 shadow-xl border border-blue-500/10 hover:shadow-2xl transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -3 }}
                      >
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                          <div className="flex items-center gap-6 flex-1">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
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
                                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                  Transaction Date
                                </p>
                                <p className="text-lg text-blue-500 font-medium">
                                  {payment.date}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                  Payment Method
                                </p>
                                <p className="text-lg text-blue-500 font-medium">
                                  {payment.method}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                  Status
                                </p>
                                <div className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-blue-500 text-white">
                                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                  {payment.status}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-4xl font-bold text-blue-500">
                              ${payment.amount.toLocaleString()}
                            </p>
                            <p className="text-blue-500/70 text-sm mt-1">
                              Payment Amount
                            </p>
                          </div>
                        </div>
                      </motion.div>
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
