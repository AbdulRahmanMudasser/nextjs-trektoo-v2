import axios from 'axios';

/**
 * Centralized API client for hotel-related requests
 */
const hotelApi = axios.create({
    baseURL: '/api/hotel',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Fetch hotels based on search parameters
 * @param {URLSearchParams} searchParams - Search parameters
 * @returns {Promise<Array>} Array of hotel data
 */
export const fetchHotels = async (searchParams) => {
    const query = searchParams.toString();
    try {
        const response = await hotelApi.get(`/search?${query}`);
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
        const response = await hotelApi.get(`/detail/${id}`);
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