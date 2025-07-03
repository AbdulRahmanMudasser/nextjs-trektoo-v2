'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Lock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDoCheckout } from '@/hooks/useHotels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const CheckoutPage = ({ params }) => {
  const { id } = React.use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    term_conditions: false,
    payment_gateway: 'stripe',
  });
  const [formErrors, setFormErrors] = useState({});
  const {
    mutate: doCheckout,
    isPending: isCheckingOut,
    error: checkoutError,
  } = useDoCheckout(token);

  const bookingCode = searchParams.get('booking_code');
  const roomTitle = searchParams.get('roomTitle');
  const roomPrice = searchParams.get('roomPrice');
  const roomImage = searchParams.get('roomImage');
  const beds = searchParams.get('beds');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const number_of_rooms = searchParams.get('number_of_rooms');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const hotelTitle = searchParams.get('hotelTitle');
  const hotelPrice = searchParams.get('hotelPrice');
  const bookingFee = searchParams.get('bookingFee');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !token) {
        console.warn('Redirecting to login: User not authenticated', {
          isAuthenticated,
          token,
          localStorageToken: localStorage.getItem('authToken'),
        });
        router.push(
          `/login?redirect=/hotel/${id}/checkout&${searchParams.toString()}`
        );
      } else {
        console.log('Authentication successful', { isAuthenticated, token });
      }
      setIsAuthChecked(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, token, router, id, searchParams]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim())
      errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = 'Valid email is required';
    if (!formData.phone.match(/^\+?\d{10,15}$/))
      errors.phone = 'Valid phone number is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.term_conditions)
      errors.term_conditions = 'You must accept the terms and conditions';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;

    const checkoutData = {
      code: bookingCode,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      term_conditions: formData.term_conditions.toString(),
      payment_gateway: formData.payment_gateway,
    };

    const query = new URLSearchParams({
      booking_code: bookingCode,
      roomTitle,
      roomPrice,
      roomImage,
      beds,
      adults,
      children,
      number_of_rooms,
      start_date,
      end_date,
      hotelTitle,
      hotelPrice,
      bookingFee,
    }).toString();

    if (formData.payment_gateway === 'Offline') {
      console.log('Offline payment selected, redirecting to thankyou page');
      router.push(`/thankyou?${query}`);
      return;
    }

    doCheckout(checkoutData, {
      onSuccess: (data) => {
        console.log('Checkout success:', data);
        if (formData.payment_gateway === 'stripe' && data.url) {
          window.location.href = data.url;
        } else {
          router.push(`/thankyou?${query}`);
        }
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          'Checkout failed. Please try again or contact support.';
        console.error('Checkout error:', errorMessage, error.response?.data);
        setFormErrors({ general: errorMessage });
      },
    });
  };

  const totalPrice = (
    parseFloat(roomPrice || 0) * parseInt(number_of_rooms || 1) +
    parseFloat(hotelPrice || 0) +
    parseFloat(bookingFee || 0)
  ).toFixed(2);

  if (!isAuthChecked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
      >
        <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-gray-600 text-base mt-3 font-montserrat">
            Loading checkout...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!bookingCode) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
      >
        <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="text-3xl font-bold text-gray-900 mt-4 font-montserrat">
            Invalid Booking
          </h3>
          <p className="text-gray-600 text-base mt-3">
            No booking code provided. Please try booking again.
          </p>
          <Button
            onClick={() => router.push(`/hotel/${id}`)}
            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Hotel
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
    >
      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border mt-12 p-8">
        {/* Hero Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 font-montserrat">
            Secure Your Reservation
          </h1>
          <p className="text-gray-600 text-lg mt-2 font-montserrat">
            Complete your booking with confidence.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              1
            </div>
            <span className="ml-3 text-base font-semibold text-gray-700 font-montserrat">
              Booking Summary
            </span>
          </div>
          <div className="flex-1 border-t-2 border-blue-200 mx-4 mt-5"></div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              2
            </div>
            <span className="ml-3 text-base font-semibold text-gray-700 font-montserrat">
              Payment Details
            </span>
          </div>
        </div>

        {roomImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-72 rounded-xl overflow-hidden mb-10"
          >
            <Image
              src={
                roomImage.includes('staging.trektoo.com')
                  ? `/api/image/proxy?url=${encodeURIComponent(roomImage)}`
                  : roomImage
              }
              alt={roomTitle || 'Room Image'}
              fill
              className="object-cover"
              quality={90}
            />
          </motion.div>
        )}

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
              Booking Summary
            </h2>
            <CheckCircle className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-6 text-gray-700 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold">Booking Code:</span>
              <span>{bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Hotel:</span>
              <span>{hotelTitle || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Room:</span>
              <span>{roomTitle || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Number of Rooms:</span>
              <span>{number_of_rooms || '1'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-in:</span>
              <span>{start_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-out:</span>
              <span>{end_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Guests:</span>
              <span>
                {adults || 1} Adult{adults > 1 ? 's' : ''}, {children || 0}{' '}
                Child
                {children > 1 ? 'ren' : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Beds:</span>
              <span>{beds || 'N/A'}</span>
            </div>
            <div className="border-t border-blue-100 pt-6 mt-6">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Room Price ({number_of_rooms || 1} room
                  {number_of_rooms > 1 ? 's' : ''}):
                </span>
                <span>
                  $
                  {(
                    parseFloat(roomPrice || 0) * parseInt(number_of_rooms || 1)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Hotel Price:</span>
                <span>${hotelPrice || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Booking Fee:</span>
                <span>${bookingFee || '0.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-4">
                <span>Total Price:</span>
                <span className="text-blue-500">${totalPrice}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CreditCard className="h-7 w-7 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
                Payment Information
              </h2>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Lock className="h-5 w-5 text-blue-500 mr-1" />
              Secured by Stripe
            </div>
          </div>
          {formErrors.general && (
            <div className="p-4 bg-blue-50 text-red-600 rounded-lg text-sm mb-6 border border-blue-100">
              {formErrors.general}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <Input
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                placeholder="Enter first name"
                className={`w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg ${formErrors.first_name ? 'border-red-500' : ''}`}
              />
              {formErrors.first_name && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.first_name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                placeholder="Enter last name"
                className={`w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg ${formErrors.last_name ? 'border-red-500' : ''}`}
              />
              {formErrors.last_name && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.last_name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
                className={`w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg ${formErrors.email ? 'border-red-500' : ''}`}
              />
              {formErrors.email && (
                <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className={`w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg ${formErrors.phone ? 'border-red-500' : ''}`}
              />
              {formErrors.phone && (
                <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Country
              </label>
              <Select
                value={formData.country}
                onValueChange={(value) =>
                  setFormData({ ...formData, country: value })
                }
              >
                <SelectTrigger
                  className={`w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg ${formErrors.country ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Pakistan',
                    'United States',
                    'United Kingdom',
                    'Canada',
                    'Australia',
                    'India',
                  ].map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.country && (
                <p className="text-red-600 text-xs mt-1">
                  {formErrors.country}
                </p>
              )}
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Payment Method
              </label>
              <Select
                value={formData.payment_gateway}
                onValueChange={(value) =>
                  setFormData({ ...formData, payment_gateway: value })
                }
              >
                <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base py-3 rounded-lg">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="stripe">Stripe</SelectItem> */}
                  <SelectItem value="Offline">Offline Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="terms"
                checked={formData.term_conditions}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, term_conditions: checked })
                }
                className={
                  formErrors.term_conditions
                    ? 'border-red-500'
                    : 'border-blue-200'
                }
              />
              <label htmlFor="terms" className="ml-2 text-base text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {formErrors.term_conditions && (
              <p className="text-red-600 text-xs mt-1">
                {formErrors.term_conditions}
              </p>
            )}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg py-4 text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
