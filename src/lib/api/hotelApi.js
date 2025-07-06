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
});

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
        console.error('Do Checkout API error:', {
            message: error.message,
            status: error.response?.status,
            responseData: error.response?.data,
            requestData: checkoutData,
            stack: error.stack,
        });
        throw error;
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
        console.error('Add to Cart API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
    }
};

/**
 * Fetch hotels based on search parameters
 * @param {URLSearchParams} searchParams - Search parameters
 * @returns {Promise<Array>} Array of hotel data
 */
export const fetchHotels = async (searchParams) => {
    const query = searchParams.toString();
    try {
        const response = await hotelApi.get(`/hotel/search?${query}`);
        return response.data.data || [];
    } catch (error) {
        console.error('Hotel API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
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
        console.error('Hotel Details API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
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
        console.error('Hotel Reviews API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
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
        console.error('Hotel Availability API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
    }
};

/**
 * Fetch locations based on search query
 * @param {string} query - Search query for locations
 * @returns {Promise<Array>} Array of location data
 */
export const fetchLocations = async (query) => {
    try {
        const response = await hotelApi.get(`/locations?q=${encodeURIComponent(query)}`);
        return response.data.data || [];
    } catch (error) {
        console.error('Locations API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
    }
};