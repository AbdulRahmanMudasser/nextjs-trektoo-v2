import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchHotels, fetchHotelDetails, fetchHotelReviews, fetchHotelAvailability, addToCart, doCheckout } from '@/lib/api/hotelApi';

/**
 * Custom hook to complete checkout with React Query
 * @param {string} token - User access token for authentication
 * @returns {Object} Mutation result with mutate function, loading state, and error
 */
export const useDoCheckout = (token) => {
    return useMutation({
        mutationFn: (checkoutData) => doCheckout(checkoutData, token),
        onError: (error) => {
            console.error('useDoCheckout error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

/**
 * Custom hook to add a booking to the cart with React Query
 * @param {string} token - User access token for authentication
 * @returns {Object} Mutation result with mutate function, loading state, and error
 */
export const useAddToCart = (token) => {
    return useMutation({
        mutationFn: (bookingData) => addToCart(bookingData, token),
        onError: (error) => {
            console.error('useAddToCart error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

/**
 * Custom hook to fetch hotels with React Query
 * @param {URLSearchParams} searchParams - Search parameters
 * @returns {Object} Query result with hotels, loading state, and error
 */
export const useHotels = (searchParams) => {
    return useQuery({
        queryKey: ['hotels', searchParams.toString()],
        queryFn: () => fetchHotels(searchParams),
        keepPreviousData: true,
        onError: (error) => {
            console.error('useHotels error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

/**
 * Custom hook to fetch hotel details by ID with React Query
 * @param {string} id - Hotel ID
 * @returns {Object} Query result with hotel details, loading state, and error
 */
export const useHotelDetails = (id) => {
    return useQuery({
        queryKey: ['hotel', id],
        queryFn: () => fetchHotelDetails(id),
        enabled: !!id,
        onError: (error) => {
            console.error('useHotelDetails error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

/**
 * Custom hook to fetch hotel reviews by ID with React Query
 * @param {string} id - Hotel ID
 * @param {number} page - Page number for reviews
 * @param {number} perPage - Number of reviews per page
 * @returns {Object} Query result with review list, loading state, and error
 */
export const useHotelReviews = (id, page = 1, perPage = 5) => {
    return useQuery({
        queryKey: ['hotelReviews', id, page, perPage],
        queryFn: () => fetchHotelReviews(id, page, perPage),
        enabled: !!id,
        keepPreviousData: true,
        onError: (error) => {
            console.error('useHotelReviews error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

/**
 * Custom hook to fetch hotel room availability by ID with React Query
 * @param {string} id - Hotel ID
 * @returns {Object} Query result with room availability, loading state, and error
 */
export const useHotelAvailability = (id) => {
    return useQuery({
        queryKey: ['hotelAvailability', id],
        queryFn: () => fetchHotelAvailability(id),
        enabled: !!id,
        onError: (error) => {
            console.error('useHotelAvailability error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};