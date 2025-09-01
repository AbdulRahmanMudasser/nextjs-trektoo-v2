import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchActivities, fetchActivityDetails } from '@/lib/api/klookApi';
import { useDebounce } from 'use-debounce';

/**
 * Custom hook to fetch activity categories with React Query
 * @returns {Object} Query result with categories data, loading state, and error
 */
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
        cacheTime: 1000 * 60 * 60, // Keep in cache for 1 hour
        select: (data) => ({
            categories: data.categories || [],
            success: data.success || false,
        }),
        onError: (error) => {
            // Error is already logged by the API layer
            // Additional hook-specific error handling can be added here
        },
    });
};

/**
 * Custom hook to fetch activities with React Query and server-side pagination
 * @param {Object} params - Query parameters including page, limit, filters
 * @returns {Object} Query result with activities data, pagination info, loading state, and error
 */
export const useActivities = (params = {}) => {
    // Ensure page and limit are set with defaults
    const queryParams = {
        page: params.page || 1,
        limit: params.limit || 10,
        cityIds: params.cityIds || '',
        countryIds: params.countryIds || '',
        categoryIds: params.categoryIds || '',
    };

    return useQuery({
        queryKey: ['activities', queryParams],
        queryFn: () => fetchActivities(queryParams),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 15, // Consider data fresh for 15 minutes
        select: (response) => ({
            data: response.data || [],
            total: response.total || 0,
            page: response.page || 1,
            limit: response.limit || 10,
            hasNext: response.has_next || false,
            success: response.success || false,
        }),
        onError: (error) => {
            // Error is already logged by the API layer
            // Additional hook-specific error handling can be added here
        },
    });
};

/**
 * Custom hook to fetch activity details by ID with React Query
 * @param {string} id - Activity ID
 * @returns {Object} Query result with activity details, loading state, and error
 */
export const useActivityDetails = (id) => {
    return useQuery({
        queryKey: ['activity', id],
        queryFn: () => fetchActivityDetails(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
        onError: (error) => {
            // Error is already logged by the API layer
            // Additional hook-specific error handling can be added here
        },
    });
};

/**
 * Custom hook for filtered activities with debouncing
 * @param {Object} filters - Filter parameters
 * @returns {Object} Query result with filtered activities
 */
export const useFilteredActivities = (filters = {}) => {
    const [debouncedFilters] = useDebounce(filters, 300);

    return useQuery({
        queryKey: ['activities', 'filtered', debouncedFilters],
        queryFn: () => fetchActivities(debouncedFilters),
        enabled: Object.keys(debouncedFilters).length > 0,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 10, // Consider data fresh for 10 minutes
        select: (response) => ({
            data: response.data || [],
            total: response.total || 0,
            page: response.page || 1,
            limit: response.limit || 10,
            hasNext: response.has_next || false,
            success: response.success || false,
        }),
        onError: (error) => {
            // Error is already logged by the API layer
            // Additional hook-specific error handling can be added here
        },
    });
};
