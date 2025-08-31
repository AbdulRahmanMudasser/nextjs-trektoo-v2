'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  LoaderCircle,
  Bed,
  Users,
  Baby,
  RefreshCw,
  Eye,
  Star,
  Calendar,
  Phone,
  Mail,
  Clock,
  Info,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import BookingDialog from './BookingDialog';
import { format, addDays } from 'date-fns';

const RoomAvailability = ({ rooms, loading, error, hotelId, hotelData }) => {
  // Debug: Log the rooms data to see what we're receiving
  console.log('RoomAvailability - rooms data:', rooms);
  console.log('RoomAvailability - rooms type:', typeof rooms);
  console.log('RoomAvailability - rooms length:', rooms?.length);
  
  // Helper function to check if a room has valid pricing
  const hasValidPricing = (room) => {
    if (!room) return false;
    const price = room.price_text || room.price || '';
    return price && 
      price !== 'Price on request' && 
      price !== '0.00' && 
      price !== '0' && 
      price !== 'Contact for Pricing' &&
      price.trim() !== '';
  };
  
  // Check if any rooms have valid pricing
  const hasAnyPricedRooms = rooms && rooms.some(hasValidPricing);
  
  // Add processing state for better UX
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [bookingError, setBookingError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  // Parse and validate query parameters with security measures
  const parseDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  const parseNumber = (value, defaultValue, min, max) => {
    try {
      const num = parseInt(value, 10);
      if (isNaN(num)) return defaultValue;
      return Math.max(min, Math.min(max, num));
    } catch {
      return defaultValue;
    }
  };

  const checkin = parseDate(searchParams.get('checkin'));
  const checkout = parseDate(searchParams.get('checkout'));
  const adults = parseNumber(searchParams.get('adults'), 1, 1, 10);
  const children = parseNumber(searchParams.get('children'), 0, 0, 10);

  // Validate and adjust checkout date if needed
  useEffect(() => {
    if (checkin >= checkout) {
      const newCheckout = addDays(checkin, 1);
      // Update URL without page refresh
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('checkout', format(newCheckout, 'yyyy-MM-dd'));
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
  }, [checkin, checkout, searchParams, router]);

  // Cleanup stored booking intent when component unmounts
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem('bookingIntent');
      } catch (error) {
        console.warn('Could not clean up booking intent:', error);
      }
    };
  }, []);



  const handleBookNowClick = (room) => {
    if (isProcessing) return; // Prevent multiple clicks
    
    try {
      setIsProcessing(true);
      
      // Validate room data before proceeding
      if (!room || !room.id || !room.title) {
        setBookingError('Invalid room information. Please try again.');
        return;
      }

      // Extract price from room data with fallback
      let roomPrice = 0;
      const priceText = room.price_text || room.price || '';
      
      if (priceText && priceText !== 'Price on request' && priceText !== '0.00' && priceText !== '0') {
        // Try to extract numeric price from various formats
        const priceMatch = priceText.match(/[\d,]+\.?\d*/);
        if (priceMatch) {
          roomPrice = parseFloat(priceMatch[0].replace(/,/g, ''));
        }
      }

      // Validate dates
      if (!checkin || !checkout || checkin >= checkout) {
        setBookingError('Please select valid check-in and check-out dates.');
        return;
      }

      // Build secure query parameters
      const query = new URLSearchParams({
        roomId: room.id.toString(),
        roomTitle: room.title,
        roomPrice: roomPrice.toString(),
        roomImage: room.gallery?.[0]?.large || room.image || '',
        beds: room.beds_html || 'Not specified',
        adults: String(Math.max(1, Math.min(adults, 10))), // Sanitize adults (1-10)
        children: String(Math.max(0, Math.min(children, 10))), // Sanitize children (0-10)
        start_date: format(checkin, 'yyyy-MM-dd'),
        end_date: format(checkout, 'yyyy-MM-dd'),
        hotelTitle: hotelData.title || 'Hotel',
        hotelPrice: (hotelData.price || '0').toString(),
        bookingFee: hotelData.bookingFee || '0',
      }).toString();

      // Secure redirect for unauthenticated users
      if (!isAuthenticated) {
        // Store booking intent in sessionStorage for security
        const bookingIntent = {
          roomId: room.id,
          hotelId: hotelId,
          timestamp: Date.now(),
          expires: Date.now() + (30 * 60 * 1000), // 30 minutes expiry
        };
        
        try {
          sessionStorage.setItem('bookingIntent', JSON.stringify(bookingIntent));
        } catch (storageError) {
          console.warn('Could not store booking intent:', storageError);
        }
        
        // Redirect to login with secure parameters
        const loginUrl = `/login?redirect=${encodeURIComponent(`/hotel/${hotelId}/checkout`)}&${query}`;
        router.push(loginUrl);
        return;
      }

      // User is authenticated, proceed with booking
      setSelectedRoom(room);
      setIsDialogOpen(true);
      setBookingError(null);
      
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="w-full">
          <div className="w-full p-6 sm:p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <LoaderCircle className="h-12 w-12 text-blue-500 animate-spin" />
                <div className="absolute inset-0 h-12 w-12 border-2 border-blue-200 rounded-full animate-ping"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Finding Available Rooms
                </h3>
                <p className="text-gray-500 text-sm">
                  Searching for the perfect accommodation for your stay...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter rooms to show only those with valid pricing information
  const availableRooms = rooms.filter(room => {
    if (!room || !room.title) return false;
    return hasValidPricing(room);
  });

    // Check if dates are selected
  const hasSelectedDates = checkin && checkout && checkin < checkout;
  
  if (error || !availableRooms.length) {
    // Show different messages based on the situation
    const hasRoomsButNoPricing = rooms && rooms.length > 0 && !hasAnyPricedRooms;
    const noRoomsAtAll = !rooms || rooms.length === 0;
    
         // If no dates selected, show date selection prompt
     if (!hasSelectedDates) {
       return (
         <div className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
           <div className="w-full">
             <div className="w-full p-6 sm:p-8">
               {/* Beautiful Date Selection Prompt */}
               <div className="max-w-4xl mx-auto">
                 <div className="text-center space-y-6">
                   {/* Icon and Main Message */}
                   <div className="space-y-4">
                     <div className="relative">
                       <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                         <Calendar className="h-10 w-10 text-white" />
                       </div>
                       <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                         <span className="text-white text-xs font-bold">!</span>
                       </div>
                     </div>
                     
                     <div className="space-y-3">
                       <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                         Select Your Dates
                       </h2>
                       <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                         Choose your check-in and check-out dates to see available rooms and pricing for your stay
                       </p>
                     </div>
                   </div>

                                     {/* Date Selection Cards */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                     <div className="p-4 rounded-xl border border-gray-200">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                           <Calendar className="h-4 w-4 text-white" />
                         </div>
                         <h3 className="text-base font-semibold text-gray-900">Check-in Date</h3>
                       </div>
                       <p className="text-gray-700 text-sm">
                         {checkin ? format(checkin, 'EEEE, MMMM d, yyyy') : 'Not selected'}
                       </p>
                     </div>
                     
                     <div className="p-4 rounded-xl border border-gray-200">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                           <Calendar className="h-4 w-4 text-white" />
                         </div>
                         <h3 className="text-base font-semibold text-gray-900">Check-out Date</h3>
                       </div>
                       <p className="text-gray-700 text-sm">
                         {checkout ? format(checkout, 'EEEE, MMMM d, yyyy') : 'Not selected'}
                       </p>
                     </div>
                   </div>

                                     {/* Action Buttons */}
                   <div className="flex flex-col sm:flex-row gap-3 justify-center">
                     <button
                       onClick={() => {
                         const newCheckout = addDays(checkin, 1);
                         const newSearchParams = new URLSearchParams(searchParams);
                         newSearchParams.set('checkout', format(newCheckout, 'yyyy-MM-dd'));
                         router.replace(`?${newSearchParams.toString()}`, { scroll: false });
                       }}
                       className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                     >
                       <Calendar className="h-4 w-4" />
                       Set Tomorrow as Check-out
                     </button>
                     
                     <button
                       onClick={() => router.push(`/hotel/${hotelId}?checkin=${format(checkin, 'yyyy-MM-dd')}&checkout=${format(addDays(checkin, 2), 'yyyy-MM-dd')}`)}
                       className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                     >
                       <Calendar className="h-4 w-4" />
                       Plan 2-Night Stay
                     </button>
                   </div>

                                     {/* Additional Info */}
                   <div className="mt-6 p-4 rounded-xl border border-gray-200">
                     <div className="flex items-start gap-3">
                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                         <Info className="h-5 w-5 text-blue-600" />
                       </div>
                       <div className="text-left">
                         <h4 className="text-base font-semibold text-gray-900 mb-2">Why Select Dates?</h4>
                         <ul className="text-gray-600 space-y-1 text-sm">
                           <li>• See real-time room availability for your specific dates</li>
                           <li>• Get accurate pricing based on your stay duration</li>
                           <li>• Check room types and amenities available</li>
                           <li>• Secure your preferred accommodation</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

         // Show no rooms available message
     return (
       <div className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
         <div className="w-full">
           <div className="w-full p-6 sm:p-8">
             <div className="max-w-4xl mx-auto">
               <div className="text-center space-y-6">
                 {/* Icon and Main Message */}
                 <div className="space-y-4">
                   <div className="relative">
                     <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                       <Bed className="h-10 w-10 text-white" />
                     </div>
                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                       <span className="text-white text-xs font-bold">!</span>
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                       {error ? 'Unable to Load Rooms' : 
                         hasRoomsButNoPricing ? 'No Priced Rooms Available' : 'No Rooms Available'}
                     </h2>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                       {error
                         ? 'We encountered an issue while fetching room availability. Please try again.'
                         : hasRoomsButNoPricing
                         ? 'We found rooms but none have current pricing information. All rooms are either priced on request or temporarily unavailable.'
                         : 'No rooms are currently available for this hotel. Please try again later or contact the hotel directly.'}
                     </p>
                   </div>
                 </div>

                

                                 {/* Action Buttons */}
                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
                   {error ? (
                     <button
                       onClick={() => window.location.reload()}
                       className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                     >
                       <RefreshCw className="h-4 w-4" />
                       Try Again
                     </button>
                   ) : (
                                          <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:from-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                      </button>
                   )}
                   
                   
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

     return (
     <div className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
       <div className="w-full">
         <div className="w-full p-6 sm:p-8">
                      {/* Enhanced Header Section with Room Count */}
            <div className="text-center mb-8">
              <div className="space-y-4">
                {/* Main Title with Icon */}
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Bed className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Available Rooms
                    </h2>
                    <p className="text-blue-600 font-medium text-sm">Select your perfect accommodation</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  Choose from our selection of comfortable and well-appointed rooms for your stay
                </p>
                
                {/* Enhanced Room Summary Information */}
                <div className="inline-flex items-center gap-4 px-4 py-3 border border-gray-200 rounded-xl text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-semibold">
                      {availableRooms.length} room{availableRooms.length !== 1 ? 's' : ''} with pricing
                    </span>
                  </div>
                  {rooms && rooms.length > availableRooms.length && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-700 font-semibold">
                        {rooms.length - availableRooms.length} room{rooms.length - availableRooms.length !== 1 ? 's' : ''} priced on request
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Date Information */}
                <div className="inline-flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">
                    {format(checkin, 'MMM d')} - {format(checkout, 'MMM d, yyyy')}
                  </span>
                  <span className="text-gray-500">
                    ({Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))} night{Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)) !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
            </div>

             {bookingError && !isDialogOpen && (
         <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
           <p className="font-medium">{bookingError}</p>
         </div>
       )}

                                                                                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {availableRooms
                    .map((room, index) => {
                      // Ensure room has required properties with fallbacks and validate data
                      if (!room || !room.id || !room.title) {
                        console.warn('Invalid room data:', room);
                        return null;
                      }
                    
                    const safeRoom = {
                      id: room.id.toString(),
                      title: room.title.trim() || 'Room Name Not Available',
                      price_text: room.price_text || room.price || 'Contact for Pricing',
                      adults_html: room.adults_html || 'Not specified',
                      children_html: room.children_html || 'Not specified',
                      beds_html: room.beds_html || 'Not specified',
                      size_html: room.size_html || 'Not specified',
                      term_features: Array.isArray(room.term_features) && room.term_features.length > 0 
                        ? room.term_features 
                        : [
                          { title: 'Wi-Fi', icon: 'fas fa-wifi' },
                          { title: 'Air Conditioning', icon: 'fas fa-snowflake' },
                          { title: 'Private Bathroom', icon: 'fas fa-bath' },
                          { title: 'TV', icon: 'fas fa-tv' }
                        ],
                      gallery: Array.isArray(room.gallery) ? room.gallery : [],
                      image: room.image || null
                    };
                   
                                        return (
                                             <div
                        key={safeRoom.id}
                        className="group bg-white rounded-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1 hover:shadow-xl shadow-md"
                      >
                        {/* Enhanced Header with Better Gradient */}
                        <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 text-white overflow-hidden">
                          {/* Enhanced Decorative Elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{animationDelay: '1s'}}></div>
                          <div className="absolute top-1/2 right-4 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                          
                          {/* Room Title */}
                          <h3 className="text-lg font-bold mb-3 leading-tight relative z-10">
                            {safeRoom.title}
                          </h3>
                          
                          {/* Enhanced Price Section */}
                          <div className="relative z-10">
                            <div className="text-3xl font-bold mb-1">
                              {safeRoom.price_text || 'Contact for Pricing'}
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {safeRoom.price_text ? 'per night' : 'Available'}
                            </div>
                            <div className="mt-2 text-blue-200 text-xs">
                              Total for {Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))} night{Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)) !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>

                                             {/* Content Section */}
                       <div className="p-4">
                                                                             {/* Enhanced Room Features Grid */}
                           <div className="grid grid-cols-2 gap-3 mb-6">
                             <div className="rounded-xl p-3 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                                 <Bed className="h-5 w-5 text-white" />
                               </div>
                               <div className="text-sm font-semibold text-gray-800 mb-1">
                                 Beds
                               </div>
                               <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                 {safeRoom.beds_html}
                               </div>
                             </div>
                             
                             <div className="rounded-xl p-3 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                                 <Users className="h-5 w-5 text-white" />
                               </div>
                               <div className="text-sm font-semibold text-gray-800 mb-1">
                                 Capacity
                               </div>
                               <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                 {safeRoom.adults_html}
                               </div>
                             </div>
                             
                             <div className="rounded-xl p-3 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                                 <span className="text-white text-sm font-bold">m²</span>
                               </div>
                               <div className="text-sm font-semibold text-gray-800 mb-1">
                                 Size
                               </div>
                               <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                 {safeRoom.size_html}
                               </div>
                             </div>
                             
                             <div className="rounded-xl p-3 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                                 <Baby className="h-5 w-5 text-white" />
                               </div>
                               <div className="text-sm font-semibold text-gray-800 mb-1">
                                 Children
                               </div>
                               <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                 {safeRoom.children_html}
                               </div>
                             </div>
                           </div>

                                                 {/* Enhanced Amenities Section */}
                         {safeRoom.term_features.length > 0 && (
                           <div className="mb-6">
                             <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                               <span>Room Amenities</span>
                               <div className="flex-1 h-px bg-gray-200"></div>
                             </h4>
                             <div className="grid grid-cols-2 gap-2">
                               {safeRoom.term_features.slice(0, 6).map((feature, index) => (
                                 <div
                                   key={index}
                                   className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md group"
                                 >
                                   <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center flex-shrink-0">
                                     <span className="text-white text-xs font-bold">✓</span>
                                   </div>
                                   <span className="text-gray-700 text-xs font-medium group-hover:text-blue-900 transition-colors">
                                     {feature.title}
                                   </span>
                                 </div>
                               ))}
                               {safeRoom.term_features.length > 6 && (
                                 <div className="col-span-2 p-2 rounded-lg border border-gray-200 text-center">
                                   <span className="text-gray-600 text-xs font-medium">
                                     +{safeRoom.term_features.length - 6} more amenities available
                                   </span>
                                 </div>
                               )}
                             </div>
                           </div>
                         )}

                                                 {/* Enhanced Action Buttons */}
                         <div className="space-y-3">
                           <button
                             onClick={() => handleBookNowClick(room)}
                             disabled={isDialogOpen || isProcessing}
                             className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                               isDialogOpen || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                             }`}
                           >
                             {isProcessing ? (
                               <span className="flex items-center justify-center gap-2">
                                 <LoaderCircle className="h-4 w-4 animate-spin" />
                                 Processing...
                               </span>
                             ) : (
                               <span className="flex items-center justify-center gap-2">
                                 <Calendar className="h-4 w-4" />
                                 Book This Room
                               </span>
                             )}
                           </button>
                           
                           <Link
                             href={`/hotel/${hotelId}/room/${room.id}`}
                             className="block w-full text-center text-blue-700 py-2 px-4 rounded-xl text-xs font-semibold hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md"
                           >
                             <span className="flex items-center justify-center gap-2">
                               <Eye className="h-3 w-3" />
                               View Details
                             </span>
                           </Link>
                         </div>
                      </div>
                                           </div>
                     );
                   })
                   .filter(Boolean)} {/* Remove any null values */}
                 </div>

             {selectedRoom && (
         <BookingDialog
           isOpen={isDialogOpen}
           setIsOpen={setIsDialogOpen}
           room={selectedRoom}
           hotelId={hotelId}
           hotelData={hotelData}
           bookingError={bookingError}
           setBookingError={setBookingError}
           staticData={{
             start_date: format(checkin, 'yyyy-MM-dd'),
             end_date: format(checkout, 'yyyy-MM-dd'),
             adults: String(adults),
             children: String(children),
           }}
         />
       )}
         </div>
       </div>
     </div>
   );
};

RoomAvailability.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      size_html: PropTypes.string.isRequired,
      beds_html: PropTypes.string.isRequired,
      adults_html: PropTypes.string.isRequired,
      children_html: PropTypes.string.isRequired,
      price_text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          large: PropTypes.string.isRequired,
          thumb: PropTypes.string.isRequired,
        })
      ).isRequired,
      term_features: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  hotelId: PropTypes.string.isRequired,
  hotelData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bookingFee: PropTypes.string.isRequired,
    policy: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default RoomAvailability;
