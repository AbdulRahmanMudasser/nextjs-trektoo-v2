import { useQuery } from '@tanstack/react-query';
import { fetchHotels, fetchHotelDetails, fetchHotelReviews } from '@/lib/api/hotelApi';

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