import axios from 'axios';

/**
 * Centralized API client for hotel-related requests
 */
const hotelApi = axios.create({
    baseURL: 'https://staging.trektoo.com/api',

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30-second timeout
});

/**
 * Helper function to format errors for logging
 */
const formatError = (error) => ({
    message: error.message || 'Unknown error',
    status: error.response?.status || 'No status',
    data: error.response?.data || 'No data',
    stack: error.stack || 'No stack trace',
});

/**
 * Convert technical errors to user-friendly messages
 */
const getUserFriendlyError = (error) => {
    if (!error.response) {
        return 'Unable to connect to the server. Please check your internet and try again.';
    }
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 400) {
        return data?.message || 'Invalid request. Please try again.';
    }
    if (status === 401) {
        return 'Authentication failed. Please log in again.';
    }
    if (status === 403) {
        return 'You are not allowed to perform this action. Contact support.';
    }
    if (status === 429) {
        return 'Too many attempts. Please wait a few minutes and try again.';
    }
    if (status >= 500) {
        return 'Something went wrong on our server. Please try again later.';
    }
    return data?.message || 'An unexpected error occurred. Please try again.';
};

/**
 * Fetch booking details by booking code
 * @param {string} code - Booking code
 * @param {string} token - User access token for authentication
 * @returns {Promise<Object>} Booking details
 */
export const fetchBookingDetails = async (code, token) => {
    try {
        const response = await hotelApi.get(`/hotel/booking/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('fetchBookingDetails response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Booking Details API error:', formatError(error));
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
        const response = await hotelApi.post(`/booking/doCheckout?${query}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('doCheckout response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Do Checkout API error:', formatError(error));
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
        const response = await hotelApi.post('/booking/addToCart', bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Add to Cart API error:', formatError(error));
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
        const response = await hotelApi.get(`/hotel/search?${query}`);
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
        console.error('Hotel API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotel details by ID
 * @param {string} id - Hotel ID
 * @returns {Promise<Object>} Hotel data
 */
export const fetchHotelDetails = async (id) => {
    try {
        const response = await hotelApi.get(`/hotel/detail/${id}`);
        return response.data.data || {};
    } catch (error) {
        console.error('Hotel Details API error:', formatError(error));
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
        const response = await hotelApi.get(`/hotel/detail/${id}?page=${page}&per_page=${perPage}`);
        return response.data.data?.review_lists || { data: [], current_page: 1, total_pages: 1, total: 0 };
    } catch (error) {
        console.error('Hotel Reviews API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch hotel room availability by ID
 * @param {string} id - Hotel ID
 * @returns {Promise<Array>} Array of room data
 */
export const fetchHotelAvailability = async (id) => {
    try {
        const response = await hotelApi.get(`/hotel/availability/${id}`);
        return response.data.rooms || [];
    } catch (error) {
        console.error('Hotel Availability API error:', formatError(error));
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
        const response = await hotelApi.get(`/locations?service_name=${encodeURIComponent(query)}`);
        console.log('Locations API response:', { total: response.data.total, data: response.data.data });
        return response.data.data || [];
    } catch (error) {
        console.error('Locations API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};