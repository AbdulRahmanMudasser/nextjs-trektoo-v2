'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ArrowLeft,
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DateInput from '@/components/ui/Custom/DateInput';
import Image from 'next/image';
import confetti from 'canvas-confetti';

const CheckoutPage = ({ params }) => {
  const { id } = React.use(params); // Unwrap params with React.use()
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    roomQuantity: 1,
    adults: parseInt(searchParams.get('adults')) || 1,
    children: parseInt(searchParams.get('children')) || 0,
    paymentMethod: 'credit_card',
    promoCode: '',
    termsAccepted: false,
    specialRequests: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const roomId = searchParams.get('roomId');
  const roomTitle = searchParams.get('roomTitle');
  const roomPrice = parseFloat(searchParams.get('roomPrice')) || 0;
  const roomImage = searchParams.get('roomImage') || '/placeholder-image.jpg';
  const beds = searchParams.get('beds') || 'N/A';
  const hotelTitle = searchParams.get('hotelTitle');
  const hotelPrice = parseFloat(searchParams.get('hotelPrice')) || 0;
  const bookingFee = parseFloat(searchParams.get('bookingFee')) || 0;

  useEffect(() => {
    console.log('Checkout query params:', {
      id,
      roomId,
      roomTitle,
      roomPrice,
      roomImage,
      beds,
      adults: formData.adults,
      children: formData.children,
      hotelTitle,
      hotelPrice,
      bookingFee,
    });
    if (!roomId || !roomTitle || !roomPrice || !hotelTitle || !id) {
      setErrors({ general: 'Missing booking details. Please select a room.' });
      router.push(`/hotel/${id || 'fallback'}`);
    }
  }, [roomId, roomTitle, roomPrice, hotelTitle, id, router]);

  useEffect(() => {
    if (showConfirmation) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [showConfirmation]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.checkOut <= formData.checkIn)
      newErrors.checkOut = 'Check-out must be after check-in';
    if (formData.roomQuantity < 1)
      newErrors.roomQuantity = 'At least one room is required';
    if (formData.adults < 1)
      newErrors.adults = 'At least one adult is required';
    if (formData.children < 0)
      newErrors.children = 'Children cannot be negative';
    if (!formData.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePrice = () => {
    const nights = Math.ceil(
      (formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)
    );
    const roomCost = roomPrice * formData.roomQuantity * nights;
    const tax = roomCost * 0.1; // 10% tax
    const promoDiscount = formData.promoCode === 'SAVE10' ? roomCost * 0.1 : 0; // Mock promo
    const total = roomCost + bookingFee + tax - promoDiscount;
    return { roomCost, bookingFee, tax, promoDiscount, total, nights };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Booking submitted:', {
        hotelId: id,
        roomId,
        hotelTitle,
        roomTitle,
        roomPrice,
        bookingFee,
        formData,
      });
      setShowConfirmation(true);
      setIsSubmitting(false);
    } catch (error) {
      setErrors({ general: 'Failed to process booking. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const priceBreakdown = calculatePrice();

  const steps = [
    { id: 1, title: 'Guest Info', icon: User },
    { id: 2, title: 'Booking', icon: Calendar },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Confirm', icon: CheckCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 font-montserrat pt-24"
    >
      <Dialog open={showConfirmation} onOpenChange={() => router.push('/')}>
        <DialogContent className="rounded-3xl max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 font-montserrat">
              Booking Confirmed!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </motion.div>
            <p className="text-gray-600 font-montserrat text-base">
              Your reservation for <strong>{hotelTitle}</strong> ({roomTitle})
              has been confirmed. Booking reference:{' '}
              <strong>
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </strong>
              .
            </p>
            <p className="text-gray-600 font-montserrat text-sm">
              Total: ${priceBreakdown.total.toFixed(2)} for{' '}
              {priceBreakdown.nights} nights, {formData.roomQuantity} room(s).
            </p>
            <Button
              onClick={() => router.push('/')}
              className="mt-6 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 font-montserrat text-base font-semibold"
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 flex justify-center gap-2 sm:gap-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                currentStep >= step.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              } font-montserrat font-semibold text-sm sm:text-base`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: currentStep === step.id ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              {currentStep > step.id ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.id
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Main Form */}
          <Card className="lg:col-span-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-50">
            <CardHeader className="p-6">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => router.push(`/hotel/${id}`)}
                  className="flex items-center text-blue-500 font-montserrat text-base font-medium"
                  aria-label="Back to hotel"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Hotel
                </motion.button>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 font-montserrat mt-4">
                Checkout
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Alert variant="destructive" className="mb-6 rounded-lg">
                      <AlertTitle className="font-montserrat font-semibold">
                        Error
                      </AlertTitle>
                      <AlertDescription className="flex justify-between items-center font-montserrat text-sm">
                        {errors.general}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setErrors({})}
                          aria-label="Dismiss error"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                {/* Guest Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 font-montserrat">
                      Guest Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          disabled={!!user?.first_name}
                          aria-invalid={errors.firstName ? 'true' : 'false'}
                        />
                        <AnimatePresence>
                          {errors.firstName && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.firstName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          disabled={!!user?.last_name}
                          aria-invalid={errors.lastName ? 'true' : 'false'}
                        />
                        <AnimatePresence>
                          {errors.lastName && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.lastName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          disabled={!!user?.email}
                          aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          aria-invalid={errors.phone ? 'true' : 'false'}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <motion.div
                      className="mt-8"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setCurrentStep(2)}
                        className="w-full h-14 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-montserrat text-base font-semibold"
                      >
                        Next: Booking Details
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Booking Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 font-montserrat">
                      Booking Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="checkIn"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Check-In Date
                        </Label>
                        <DateInput
                          selectedDate={formData.checkIn}
                          onChange={(date) =>
                            setFormData({ ...formData, checkIn: date })
                          }
                          placeholder="Select check-in date"
                          minDate={new Date()}
                          id="checkIn"
                          className="mt-2 h-14"
                        />
                        <AnimatePresence>
                          {errors.checkIn && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.checkIn}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="checkOut"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Check-Out Date
                        </Label>
                        <DateInput
                          selectedDate={formData.checkOut}
                          onChange={(date) =>
                            setFormData({ ...formData, checkOut: date })
                          }
                          placeholder="Select check-out date"
                          minDate={
                            new Date(
                              formData.checkIn.getTime() + 24 * 60 * 60 * 1000
                            )
                          }
                          id="checkOut"
                          className="mt-2 h-14"
                        />
                        <AnimatePresence>
                          {errors.checkOut && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.checkOut}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="roomQuantity"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Number of Rooms
                        </Label>
                        <Select
                          value={formData.roomQuantity.toString()}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              roomQuantity: parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger
                            id="roomQuantity"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500"
                          >
                            <SelectValue placeholder="Select number of rooms" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AnimatePresence>
                          {errors.roomQuantity && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.roomQuantity}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="adults"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Adults
                        </Label>
                        <Select
                          value={formData.adults.toString()}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              adults: parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger
                            id="adults"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500"
                          >
                            <SelectValue placeholder="Select number of adults" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AnimatePresence>
                          {errors.adults && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.adults}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <Label
                          htmlFor="children"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Children
                        </Label>
                        <Select
                          value={formData.children.toString()}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              children: parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger
                            id="children"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500"
                          >
                            <SelectValue placeholder="Select number of children" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AnimatePresence>
                          {errors.children && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.children}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-6 font-montserrat">
                        Special Requests
                      </h3>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialRequests: e.target.value,
                          })
                        }
                        placeholder="Any special requests (e.g., high floor, extra pillows)?"
                        className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-28 p-4 font-montserrat text-base transition-all"
                        aria-label="Special requests"
                      />
                    </div>
                    <div className="mt-8 flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="h-14 rounded-lg font-montserrat text-base px-8 border-blue-200"
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setCurrentStep(3)}
                          className="h-14 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-montserrat text-base px-8"
                        >
                          Next: Payment
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Payment Method */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 font-montserrat">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      {[
                        {
                          value: 'credit_card',
                          label: 'Credit Card',
                          icon: CreditCard,
                        },
                        { value: 'paypal', label: 'PayPal', icon: CreditCard },
                        {
                          value: 'bank_transfer',
                          label: 'Bank Transfer',
                          icon: CreditCard,
                        },
                      ].map((method) => (
                        <motion.div
                          key={method.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-6 rounded-lg border backdrop-blur-sm bg-white/30 ${
                            formData.paymentMethod === method.value
                              ? 'border-blue-500 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300'
                          } flex items-center justify-center cursor-pointer transition-all`}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.value,
                            })
                          }
                        >
                          <method.icon className="h-6 w-6 text-blue-500 mr-2" />
                          <span className="font-montserrat text-base">
                            {method.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    {formData.paymentMethod === 'credit_card' && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="cardNumber"
                            className="text-sm font-semibold text-gray-700 font-montserrat"
                          >
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="expiry"
                            className="text-sm font-semibold text-gray-700 font-montserrat"
                          >
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="cvv"
                            className="text-sm font-semibold text-gray-700 font-montserrat"
                          >
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-8 flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                          className="h-14 rounded-lg font-montserrat text-base px-8 border-blue-200"
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setCurrentStep(4)}
                          className="h-14 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-montserrat text-base px-8"
                        >
                          Next: Confirm
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Promo Code and Terms */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 font-montserrat">
                      Final Details
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <Label
                          htmlFor="promoCode"
                          className="text-sm font-semibold text-gray-700 font-montserrat"
                        >
                          Promo Code
                        </Label>
                        <div className="flex gap-4">
                          <Input
                            id="promoCode"
                            type="text"
                            value={formData.promoCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                promoCode: e.target.value,
                              })
                            }
                            placeholder="Enter promo code (e.g., SAVE10)"
                            className="mt-2 h-14 rounded-lg font-montserrat border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm"
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                promoCode: formData.promoCode,
                              })
                            }
                            className="px-8 py-3 h-14 rounded-lg bg-blue-500 hover:bg-blue-600 font-montserrat text-base"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                termsAccepted: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300 text-blue-500 shadow-sm focus:ring-blue-500 h-5 w-5"
                            aria-label="Accept terms and conditions"
                          />
                          <span className="ml-2 text-sm text-gray-600 font-montserrat">
                            I agree to the{' '}
                            <a
                              href="/terms"
                              className="text-blue-500 hover:text-blue-600"
                            >
                              Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a
                              href="/cancellation"
                              className="text-blue-500 hover:text-blue-600"
                            >
                              Cancellation Policy
                            </a>
                          </span>
                        </label>
                        <AnimatePresence>
                          {errors.termsAccepted && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-500 text-xs mt-1 font-montserrat"
                            >
                              {errors.termsAccepted}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(3)}
                          className="h-14 rounded-lg font-montserrat text-base px-8 border-blue-200"
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-14 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-montserrat text-base px-8"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                          ) : (
                            'Confirm Booking'
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </form>
              {/* Fixed Confirm Button on Mobile */}
              {currentStep === 4 && (
                <motion.div
                  className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-2xl lg:hidden z-50"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full h-14 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-montserrat text-base font-semibold"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      `Confirm Booking - $${priceBreakdown.total.toFixed(2)}`
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-50 lg:sticky lg:top-24">
            <CardHeader className="flex items-center justify-between p-6">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 font-montserrat">
                Booking Summary
              </CardTitle>
              <Button
                variant="ghost"
                className="lg:hidden font-montserrat text-base"
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                aria-label={
                  isSummaryOpen ? 'Collapse summary' : 'Expand summary'
                }
              >
                {isSummaryOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </CardHeader>
            <CardContent
              className={`${isSummaryOpen ? 'block' : 'hidden'} lg:block p-6 sm:p-8`}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={roomImage}
                    alt={roomTitle || 'Room Image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    quality={75}
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-700 font-montserrat">
                      {hotelTitle || 'Selected Hotel'}
                    </h4>
                    <p className="text-sm text-gray-600 font-montserrat">
                      Room: {roomTitle || 'Selected Room'}
                    </p>
                    <p className="text-sm text-gray-600 font-montserrat">
                      Room ID: {roomId || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 font-montserrat">
                      Hotel ID: {id}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{formData.adults} Adults</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{formData.children} Children</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{beds}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{formData.roomQuantity} Room(s)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span>
                        Check-In: {formData.checkIn.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span>
                        Check-Out: {formData.checkOut.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{priceBreakdown.nights} Nights</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Hotel Price: ${hotelPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="flex justify-between text-sm text-gray-600 font-montserrat">
                      <span>
                        Room Cost ({roomPrice.toFixed(2)} x{' '}
                        {formData.roomQuantity} x {priceBreakdown.nights}{' '}
                        nights)
                      </span>
                      <span>${priceBreakdown.roomCost.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-sm text-gray-600 font-montserrat">
                      <span>Booking Fee</span>
                      <span>${priceBreakdown.bookingFee.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-sm text-gray-600 font-montserrat">
                      <span>Taxes (10%)</span>
                      <span>${priceBreakdown.tax.toFixed(2)}</span>
                    </p>
                    {priceBreakdown.promoDiscount > 0 && (
                      <p className="flex justify-between text-sm text-green-600 font-montserrat">
                        <span>Promo Discount (SAVE10)</span>
                        <span>-${priceBreakdown.promoDiscount.toFixed(2)}</span>
                      </p>
                    )}
                    <p className="flex justify-between text-lg font-bold text-gray-800 font-montserrat mt-2">
                      <span>Total</span>
                      <span>${priceBreakdown.total.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 font-montserrat">
                      Cancellation Policy: Free cancellation up to 48 hours
                      before check-in.
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
