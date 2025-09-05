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
import { useDoCheckout, useAddToCart } from '@/hooks/useHotels';
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
import { format, addDays } from 'date-fns';

const CheckoutContent = ({ id }) => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
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
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart(token);

  useEffect(() => {
    setIsMounted(true);
    setFormData({
      first_name: searchParams.get('first_name') || '',
      last_name: searchParams.get('last_name') || '',
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
      country: searchParams.get('country') || '',
      term_conditions: searchParams.get('term_conditions') === 'true',
      payment_gateway: searchParams.get('payment_gateway') || 'stripe',
    });
  }, [searchParams]);

  let bookingCode = isMounted
    ? searchParams.get('booking_code') || localStorage.getItem('booking_code')
    : null;

  useEffect(() => {
    if (!isMounted) return;
    const pendingBooking = localStorage.getItem('pending_booking');
    if (!bookingCode && pendingBooking && isAuthenticated) {
      const { hotelId, room, staticData, hotelData } =
        JSON.parse(pendingBooking);
      const priceMatch = room.price_text.match(/\$(\d+\.?\d*)/);
      const roomPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;

      const bookingData = {
        service_id: parseInt(hotelId),
        service_type: 'hotel',
        start_date: staticData.start_date,
        end_date: staticData.end_date,
        extra_price: null,
        adults: parseInt(staticData.adults),
        children: parseInt(staticData.children),
        rooms: [
          {
            id: room.id,
            number_selected: parseInt(
              searchParams.get('number_of_rooms') || '1'
            ),
          },
        ],
      };

      addToCart(bookingData, {
        onSuccess: (data) => {
          if (data.status === 1) {
            bookingCode = data.booking_code;
            localStorage.setItem('booking_code', data.booking_code);
            const query = new URLSearchParams({
              booking_code: data.booking_code,
              roomId: room.id.toString(),
              roomTitle: room.title,
              roomPrice: roomPrice.toString(),
              roomImage: room.gallery?.[0]?.large || room.image,
              beds: room.beds_html,
              adults: staticData.adults,
              children: staticData.children,
              number_of_rooms: searchParams.get('number_of_rooms') || '1',
              start_date: staticData.start_date,
              end_date: staticData.end_date,
              hotelTitle: hotelData.title,
              hotelPrice: hotelData.price.toString(),
              bookingFee: hotelData.bookingFee,
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              phone: formData.phone,
              country: formData.country,
              term_conditions: formData.term_conditions.toString(),
              payment_gateway: formData.payment_gateway,
            }).toString();
            router.replace(`/hotel/${hotelId}/checkout?${query}`);
          } else {
            setFormErrors({ general: data.message || 'Failed to add to cart' });
          }
        },
        onError: (error) => {
          setFormErrors({
            general: error.response?.data?.message || 'Failed to add to cart',
          });
        },
      });
    }
  }, [
    isMounted,
    isAuthenticated,
    bookingCode,
    addToCart,
    router,
    formData,
    searchParams.get('number_of_rooms'),
  ]);

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
    if (!isAuthenticated || !token) {
      const query = new URLSearchParams({
        booking_code: bookingCode || '',
        roomId: searchParams.get('roomId') || '',
        roomTitle: searchParams.get('roomTitle') || '',
        roomPrice: searchParams.get('roomPrice') || '',
        roomImage: searchParams.get('roomImage') || '',
        beds: searchParams.get('beds') || '',
        adults: searchParams.get('adults') || '',
        children: searchParams.get('children') || '',
        number_of_rooms: searchParams.get('number_of_rooms') || '',
        start_date: searchParams.get('start_date') || '',
        end_date: searchParams.get('end_date') || '',
        hotelTitle: searchParams.get('hotelTitle') || '',
        hotelPrice: searchParams.get('hotelPrice') || '',
        bookingFee: searchParams.get('bookingFee') || '',
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        term_conditions: formData.term_conditions.toString(),
        payment_gateway: formData.payment_gateway,
      }).toString();
      localStorage.setItem('pending_checkout', JSON.stringify(formData));
      router.push(`/login?redirect=/hotel/${id}/checkout&${query}`);
      return;
    }

    if (!validateForm()) return;

    if (!bookingCode) {
      setFormErrors({
        general: 'No booking code available. Please try booking again.',
      });
      return;
    }

    if (!token) {
      setFormErrors({
        general: 'Authentication token is missing. Please log in again.',
      });
      return;
    }

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
      roomId: searchParams.get('roomId') || '',
      roomTitle: searchParams.get('roomTitle') || '',
      roomPrice: searchParams.get('roomPrice') || '',
      roomImage: searchParams.get('roomImage') || '',
      beds: searchParams.get('beds') || '',
      adults: searchParams.get('adults') || '',
      children: searchParams.get('children') || '',
      number_of_rooms: searchParams.get('number_of_rooms') || '',
      start_date: searchParams.get('start_date') || '',
      end_date: searchParams.get('end_date') || '',
      hotelTitle: searchParams.get('hotelTitle') || '',
      hotelPrice: searchParams.get('hotelPrice') || '',
      bookingFee: searchParams.get('bookingFee') || '',
    }).toString();

    if (formData.payment_gateway === 'Offline') {
      router.push(`/thankyou?${query}`);
      return;
    }

    doCheckout(checkoutData, {
      onSuccess: (data) => {
        localStorage.removeItem('pending_booking');
        localStorage.removeItem('pending_checkout');
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
        setFormErrors({ general: errorMessage });
      },
    });
  };

  const totalPrice = (
    (parseFloat(searchParams.get('roomPrice') || '0') || 0) *
      (parseInt(searchParams.get('number_of_rooms') || '1') || 1) +
    (parseFloat(searchParams.get('hotelPrice') || '0') || 0) +
    (parseFloat(searchParams.get('bookingFee') || '0') || 0)
  ).toFixed(2);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  if (!bookingCode && !localStorage.getItem('pending_booking')) {
    return (
      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
        </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
          className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-16 px-4"
      >
          <div className="w-full max-w-md mx-auto p-6 text-center bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="text-3xl font-bold text-gray-900 mt-4 font-montserrat">
            Invalid Booking
          </h3>
          <p className="text-gray-600 text-base mt-3">
            No booking code provided. Please try booking again.
          </p>
          <Button
            onClick={() => router.push(`/hotel/${id}`)}
              className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Hotel
          </Button>
        </div>
      </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
      </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
        <div className="max-w-[85vw] mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8 mb-8">
            <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 font-montserrat tracking-tight">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 text-lg mt-2 font-montserrat">
            Secure your stay with ease and confidence.
          </p>
            </div>
        </div>

        {searchParams.get('roomImage') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden mb-8"
          >
            <Image
              src={
                searchParams.get('roomImage').includes('staging.trektoo.com')
                  ? `/api/image/proxy?url=${encodeURIComponent(searchParams.get('roomImage'))}`
                  : searchParams.get('roomImage')
              }
              alt={searchParams.get('roomTitle') || 'Room Image'}
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <h2 className="absolute bottom-4 left-4 text-2xl font-semibold text-white font-montserrat">
              {searchParams.get('roomTitle') || 'Your Selected Room'}
            </h2>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
                    Payment Details
                  </h2>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="h-4 w-4 text-blue-600 mr-1" />
                  Secured by Stripe
                </div>
              </div>

              {formErrors.general && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-6">
                  {formErrors.general}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      value={formData.first_name}
                      onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                      }
                      placeholder="Enter first name"
                      className={`w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg ${
                        formErrors.first_name ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.first_name && (
                      <p className="text-red-600 text-xs mt-1">
                        {formErrors.first_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      value={formData.last_name}
                      onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                      }
                      placeholder="Enter last name"
                      className={`w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg ${
                        formErrors.last_name ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.last_name && (
                      <p className="text-red-600 text-xs mt-1">
                        {formErrors.last_name}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email"
                    className={`w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg ${
                      formErrors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className={`w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg ${
                      formErrors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-600 text-xs mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger
                      className={`w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg ${
                        formErrors.country ? 'border-red-500' : ''
                      }`}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <Select
                    value={formData.payment_gateway}
                    onValueChange={(value) =>
                      setFormData({ ...formData, payment_gateway: value })
                    }
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 text-base py-3 rounded-lg">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Offline">Offline Payment</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
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
                        : 'border-gray-300'
                    }
                  />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-700"
                    >
                    I agree to the{' '}
                      <a
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
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
                  disabled={isCheckingOut || isAddingToCart}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isCheckingOut || isAddingToCart ? (
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

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
                  Booking Summary
                </h2>
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-4 text-gray-700 text-base">
                <div className="flex justify-between">
                  <span className="font-medium">Hotel:</span>
                  <span>{searchParams.get('hotelTitle') || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Room:</span>
                  <span>{searchParams.get('roomTitle') || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Number of Rooms:</span>
                  <span>{searchParams.get('number_of_rooms') || '1'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Check-in:</span>
                  <span>{searchParams.get('start_date') || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Check-out:</span>
                  <span>{searchParams.get('end_date') || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span>
                    {searchParams.get('adults') || 1} Adult
                    {searchParams.get('adults') > 1 ? 's' : ''},{' '}
                    {searchParams.get('children') || 0} Child
                    {searchParams.get('children') > 1 ? 'ren' : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Beds:</span>
                  <span>{searchParams.get('beds') || 'N/A'}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      Room Price ({searchParams.get('number_of_rooms') || 1}{' '}
                      room
                      {searchParams.get('number_of_rooms') > 1 ? 's' : ''}):
                    </span>
                    <span>
                      $
                      {(
                        (parseFloat(searchParams.get('roomPrice') || '0') ||
                          0) *
                          (parseInt(
                            searchParams.get('number_of_rooms') || '1'
                          ) || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hotel Price:</span>
                    <span>${searchParams.get('hotelPrice') || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Booking Fee:</span>
                    {/* <span>${searchParams.get('bookingFee') || '0.00'}</span> */}
                    <span>$1090</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total Price:</span>
                    {/* <span className="text-blue-600">${totalPrice}</span> */}
                    <span className="text-blue-600">$1090</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
    </main>
  );
};

export default CheckoutContent;
