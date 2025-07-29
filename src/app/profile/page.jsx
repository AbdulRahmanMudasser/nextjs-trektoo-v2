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
import {
  containerVariants,
  itemVariants,
  floatingAnimation,
} from '@/components/feature/Profile/ProfileAnimations';
import { ProfileHeader } from '@/components/feature/Profile/ProfileHeader';
import { ProfileContent } from '@/components/feature/Profile/ProfileContent';

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

  const tabs = [
    {
      id: 'personal',
      label: 'Profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      gradient: 'from-purple-500 to-violet-600',
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
          email: formData.email,
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-[url('/pattern.png')] bg-cover bg-fixed relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white/90 backdrop-blur-xl p-16 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 border border-white/50"
          >
            <motion.div
              animate={floatingAnimation}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
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
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 tracking-tight font-montserrat">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Access your premium dashboard and manage your profile with ease.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl w-full"
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
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-[url('/pattern.png')] bg-cover bg-fixed relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-16 px-4">
          <motion.div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"
            />
            <p className="text-blue-600 text-xl font-medium">
              Loading your dashboard...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-[url('/pattern.png')] bg-cover bg-fixed relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader
            formData={formData}
            bookings={bookings}
            avatarError={avatarError}
            setAvatarError={setAvatarError}
            itemVariants={itemVariants}
          />

          {/* Profile Content */}
          <ProfileContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            bookings={bookings}
            payments={payments}
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            itemVariants={itemVariants}
            floatingAnimation={floatingAnimation}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handlePageChange={handlePageChange}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
