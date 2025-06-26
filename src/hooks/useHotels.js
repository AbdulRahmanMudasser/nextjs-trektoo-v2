import { useQuery } from '@tanstack/react-query';
import { fetchHotels, fetchHotelDetails } from '@/lib/api/hotelApi';

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