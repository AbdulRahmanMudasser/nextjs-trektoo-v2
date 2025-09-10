import axios from 'axios';
import secureApiClient from './secureApiClient';
import { logError, getUserFriendlyError } from '@/lib/services/errorHandler';

/**
 * Fetch booking details by booking code
 * @param {string} code - Booking code
 * @param {string} token - User access token for authentication
 * @returns {Promise<Object>} Booking details
 */
export const fetchBookingDetails = async (code, token) => {
    try {
        const response = await secureApiClient.get(`/hotel/booking/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('fetchBookingDetails response:', response.data);
        return response.data;
    } catch (error) {
        logError('Booking Details API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Complete checkout for a booking
 * @param {Object} checkoutData - Checkout data (code, first_name, last_name, email, phone, country, term_conditions, payment_gateway)
 * @param {string} token - User access token for authentication
 * @returns {Promise<Object>} Checkout response with url
 */
export const doCheckout = async (checkoutData, token) => {
    try {
        const query = new URLSearchParams(checkoutData).toString();
        console.log('doCheckout request:', { url: `/booking/doCheckout?${query}`, checkoutData, token });
        const response = await secureApiClient.post(`/booking/doCheckout?${query}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('doCheckout response:', response.data);
        return response.data;
    } catch (error) {
        logError('Do Checkout API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Add a booking to the cart
 * @param {Object} bookingData - Booking data (service_id, service_type, start_date, end_date, etc.)
 * @param {string} token - User access token for authentication
 * @returns {Promise<Object>} Booking response with booking_code and url
 */
export const addToCart = async (bookingData, token) => {
    try {
        const response = await secureApiClient.post('/booking/addToCart', bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        logError('Add to Cart API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotels based on search parameters
 * @param {URLSearchParams} searchParams - Search parameters
 * @returns {Promise<Object>} Response object with hotels data, total count, and pagination info
 */
export const fetchHotels = async (searchParams) => {
    const query = searchParams.toString();
    try {
        const response = await secureApiClient.get(`/hotel/search?${query}`);
        console.log('Hotels API response:', response.data);

        // Return the complete response object with pagination info
        return {
            data: response.data.data || [],
            total: response.data.total || 0,
            total_pages: response.data.total_pages || 1,
            current_page: response.data.current_page || 1,
            per_page: response.data.per_page || 15,
            success: response.data.success || false,
            isAllowed: response.data.isAllowed || true,
            message: response.data.message || ''
        };
    } catch (error) {
        logError('Hotel API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotel details by ID with optional room availability parameters
 * @param {string} id - Hotel ID
 * @param {string} checkin - Check-in date (YYYY-MM-DD format)
 * @param {string} checkout - Check-out date (YYYY-MM-DD format)
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children
 * @returns {Promise<Object>} Hotel data with proper structure
 */
export const fetchHotelDetails = async (id, checkin = null, checkout = null, adults = 1, children = 0) => {
    try {
        // Build query parameters - API requires these parameters
        const queryParams = new URLSearchParams();
        queryParams.append('adults', adults.toString());
        queryParams.append('children', children.toString());

        // Use provided dates or default values
        const checkinDate = checkin || '2025-12-12';
        const checkoutDate = checkout || '2025-12-14';

        queryParams.append('checkin', checkinDate);
        queryParams.append('checkout', checkoutDate);

        const query = queryParams.toString();
        console.log('🔍 fetchHotelDetails called with:', { id, checkin, checkout, adults, children });
        console.log('🔍 fetchHotelDetails - Query Params:', query);

        // Use secureApiClient like hotel search does - this goes through the API route
        const response = await secureApiClient.get(`/hotel/detail/${id}?${query}`);
        console.log('Hotel Details API response:', response.data);
        const hotelData = response.data;

        // Check if the response contains an error (new API format)
        if (!hotelData.success || hotelData.success === false) {
            throw new Error(hotelData.message || 'Hotel not found');
        }

        // Transform and clean hotel data - handle new response format
        return {
            // Map fields from the new API response format
            id: hotelData.id || id,
            title: hotelData.title?.trim() || 'Hotel Name Not Available',
            price: hotelData.price || '0.00',
            sale_price: hotelData.sale_price || hotelData.price || '0.00',
            image: hotelData.image || '',
            content: hotelData.content || '<p>No description available.</p>',
            location: hotelData.location || '',
            is_featured: hotelData.is_featured || 0,
            // Transform rooms object to array for frontend compatibility
            rooms: hotelData.rooms && hotelData.rooms.rates ? hotelData.rooms.rates : [],
            // Add additional fields for compatibility
            address: hotelData.address || 'Address not available',
            gallery: hotelData.gallery || [hotelData.image].filter(Boolean),
            banner_image: hotelData.banner_image || hotelData.image,
            map_lat: hotelData.map_lat || '0',
            map_lng: hotelData.map_lng || '0',
            map_zoom: hotelData.map_zoom || 10,
            review_score: hotelData.review_score || {
                score_total: 0,
                total_review: 0,
                score_text: 'Not rated'
            },
            terms: hotelData.terms || {},
            policy: hotelData.policy || [],
            object_model: hotelData.object_model || 'hotel',
            discount_percent: hotelData.discount_percent || null,
            video: hotelData.video || null,
            enable_extra_price: hotelData.enable_extra_price || 0,
            extra_price: hotelData.extra_price || null,
            // Add new response fields
            success: hotelData.success || true,
            isAllowed: hotelData.isAllowed || true,
            message: hotelData.message || ''
        };
    } catch (error) {
        logError('Hotel Details API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotel reviews by ID with pagination
 * @param {string} id - Hotel ID
 * @param {number} page - Page number for reviews
 * @param {number} perPage - Number of reviews per page
 * @returns {Promise<Object>} Review list data
 */
export const fetchHotelReviews = async (id, page = 1, perPage = 5) => {
    try {
        const response = await secureApiClient.get(`/hotel/detail/${id}?page=${page}&per_page=${perPage}`);
        return response.data.data?.review_lists || { data: [], current_page: 1, total_pages: 1, total: 0 };
    } catch (error) {
        logError('Hotel Reviews API', error);
        throw new Error(getUserFriendlyError(error));
    }
};


/**
 * Fetch locations based on search query
 * @param {string} query - Search query for locations
 * @returns {Promise<Array>} Array of location data
 */
export const fetchLocations = async (query) => {
    try {
        // Create axios instance for staging API
        const stagingClient = axios.create({
            baseURL: 'https://staging.trektoo.com/api/',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const response = await stagingClient.get(`locations?service_name=${encodeURIComponent(query)}`);
        console.log('Locations API response:', { total: response.data.total, data: response.data.data });

        // Transform location data to match frontend expectations
        const locations = response.data.data || [];
        return locations.map(location => ({
            ...location,
            // Ensure title property exists for frontend compatibility
            title: location.title || location.name || location.city || 'Unknown Location',
            // Ensure id property exists
            id: location.id || location.location_id || Math.random().toString(36).substr(2, 9)
        }));
    } catch (error) {
        logError('Locations API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Prebook a hotel room to check availability and pricing
 * @param {string} roomId - Room ID (e.g., "h-6dec05cb-b45f-5455-bcb0-9eff03011e1d")
 * @param {string} checkin - Check-in date (YYYY-MM-DD)
 * @param {string} checkout - Check-out date (YYYY-MM-DD)
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children
 * @returns {Promise<Object>} Prebook response with pricing and availability
 */
export const prebookHotel = async (roomId, checkin, checkout, adults = 1, children = 0) => {
    try {
        // Prebook API only takes the book_hash, no query parameters
        const apiUrl = `/hotel/prebook/${roomId}`;

        console.log('🔍 Prebook API Call - URL:', apiUrl);
        console.log('🔍 Prebook API Call - Params:', { roomId, checkin, checkout, adults, children });

        const response = await secureApiClient.get(apiUrl);
        console.log('🔍 Prebook API Response:', response.data);

        // Check for errors in response
        if (!response.data.success || response.data.success === false) {
            console.log('🔍 Prebook API Error Response:', response.data);
            throw new Error(response.data.message || 'Prebook failed');
        }

        // Check for price changes
        if (response.data.changes && response.data.changes.price_changed === true) {
            throw new Error('Price has changed. Please refresh and try again.');
        }

        console.log('🔍 Prebook API Success Response:', response.data);
        return response.data;
    } catch (error) {
        logError('Prebook API', error);
        throw new Error(getUserFriendlyError(error));
    }
};