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
        };
    } catch (error) {
        logError('Hotel API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotel details by ID
 * @param {string} id - Hotel ID
 * @returns {Promise<Object>} Hotel data with proper structure
 */
export const fetchHotelDetails = async (id) => {
    try {
        const response = await secureApiClient.get(`/hotel/detail/${id}`);
        const hotelData = response.data.data || {};

        // Transform and clean hotel data
        return {
            ...hotelData,
            // Ensure ID is set
            id: id,
            // Clean title (remove extra whitespace)
            title: hotelData.title?.trim() || 'Hotel Name Not Available',
            // Ensure proper price handling
            price: hotelData.price || '0.00',
            sale_price: hotelData.sale_price || hotelData.price || '0.00',
            // Ensure proper address
            address: hotelData.address || 'Address not available',
            // Ensure proper content
            content: hotelData.content || '<p>No description available.</p>',
            // Ensure proper gallery
            gallery: hotelData.gallery || [hotelData.image].filter(Boolean),
            // Ensure proper banner image
            banner_image: hotelData.banner_image || hotelData.image,
            // Ensure proper location
            location: hotelData.location || { name: 'Location not available' },
            // Ensure proper review score
            review_score: hotelData.review_score || {
                score_total: 0,
                total_review: 0,
                score_text: 'Not rated'
            },
            // Ensure proper map coordinates
            map_lat: hotelData.map_lat || '0',
            map_lng: hotelData.map_lng || '0',
            map_zoom: hotelData.map_zoom || 10,
            // Ensure proper rooms array
            rooms: hotelData.rooms || [],
            // Ensure proper terms structure
            terms: hotelData.terms || {},
            // Ensure proper policy array
            policy: hotelData.policy || []
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
 * Fetch hotel room availability by ID with checkin/checkout dates
 * @param {string} id - Hotel ID
 * @param {string} checkin - Check-in date (YYYY-MM-DD format)
 * @param {string} checkout - Check-out date (YYYY-MM-DD format)
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children
 * @returns {Promise<Array>} Array of room data with formatted properties
 */
export const fetchHotelAvailability = async (id, checkin, checkout, adults = 1, children = 0) => {
    try {
        // Validate ID before making API call
        if (!id || id === 'null' || id === 'undefined') {
            throw new Error('Invalid hotel ID provided for availability check');
        }

        // Validate required parameters
        if (!checkin || !checkout) {
            throw new Error('Check-in and check-out dates are required for room availability');
        }

        // Build query parameters
        const queryParams = new URLSearchParams({
            checkin: checkin,
            checkout: checkout,
            adults: adults.toString(),
            children: children.toString()
        });

        // New API call with date and guest parameters
        const response = await secureApiClient.get(`/hotel/availability/${id}?${queryParams.toString()}`);
        const rooms = response.data.rooms || [];

        // Previous API call (commented out)
        // const response = await secureApiClient.get(`/hotel/availability/${id}`);
        // const rooms = response.data.rooms || [];

        // Transform room data to match component expectations
        return rooms.map(room => ({
            ...room,
            // Format price display
            price_text: room.price ? `$${parseFloat(room.price).toFixed(2)}` : 'Price on request',
            // Format capacity display
            adults_html: room.adults ? `${room.adults} Adult${room.adults > 1 ? 's' : ''}` : 'Not specified',
            children_html: room.children ? `${room.children} Child${room.children > 1 ? 'ren' : ''}` : 'Not specified',
            beds_html: room.beds ? `${room.beds} Bed${room.beds > 1 ? 's' : ''}` : 'Not specified',
            size_html: room.size ? `${room.size} m²` : 'Not specified',
            // Add default amenities if none exist
            term_features: room.term_features || [
                { title: 'Wi-Fi', icon: 'fas fa-wifi' },
                { title: 'Air Conditioning', icon: 'fas fa-snowflake' },
                { title: 'Private Bathroom', icon: 'fas fa-bath' },
                { title: 'TV', icon: 'fas fa-tv' }
            ],
            // Add gallery fallback
            gallery: room.gallery || [],
            // Add image fallback
            image: room.image || room.gallery?.[0] || null
        }));
    } catch (error) {
        logError('Hotel Availability API', error);
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
        const response = await secureApiClient.get(`/locations?service_name=${encodeURIComponent(query)}`);
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