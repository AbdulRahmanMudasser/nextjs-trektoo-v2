import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchHotels, fetchHotelDetails, fetchHotelReviews, fetchHotelAvailability, addToCart, doCheckout, fetchLocations, fetchBookingDetails } from '@/lib/api/hotelApi';
import { useDebounce } from 'use-debounce';

/**
 * Custom hook to fetch booking details by code with React Query
 * @param {string} code - Booking code
 * @param {string} token - User access token for authentication
 * @returns {Object} Query result with booking details, loading state, and error
 */
export const useBookingDetails = (code, token) => {
    return useQuery({
        queryKey: ['booking', code],
        queryFn: () => fetchBookingDetails(code, token),
        enabled: !!code && !!token,
        onError: (error) => {
            console.error('useBookingDetails error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
        },
    });
};

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
 * Custom hook to fetch hotels with React Query and server-side pagination
 * @param {URLSearchParams} searchParams - Search parameters including page and per_page
 * @returns {Object} Query result with hotels data, pagination info, loading state, and error
 */
export const useHotels = (searchParams) => {
    // Ensure page and per_page are set with defaults
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
        params.set('page', '1');
    }
    if (!params.has('per_page')) {
        params.set('per_page', '15');
    }

    return useQuery({
        queryKey: ['hotels', params.toString()],
        queryFn: () => fetchHotels(params),
        keepPreviousData: true,
        select: (response) => ({
            data: response.data || [],
            total: response.total || 0,
            totalPages: response.total_pages || 1,
            currentPage: response.current_page || 1,
            perPage: response.per_page || 15,
        }),
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

/**
 * Custom hook to fetch locations with React Query and debouncing
 * @param {string} query - Search query for locations
 * @returns {Object} Query result with locations, loading state, and error
 */
export const useLocations = (query) => {
    const [debouncedQuery] = useDebounce(query, 300);
    return useQuery({
        queryKey: ['locations', debouncedQuery],
        queryFn: () => fetchLocations(debouncedQuery),
        enabled: !!debouncedQuery && debouncedQuery.length >= 4,
        keepPreviousData: true,
        select: (data) => ({
            data,
            errorMessage: null,
        }),
        onError: (error) => {
            console.error('useLocations error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack,
            });
            return { data: [], errorMessage: error.message };
        },
    });
};