import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '@/lib/api/hotelApi';

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