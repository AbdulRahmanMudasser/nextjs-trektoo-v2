import axios from 'axios';

/**
 * Centralized API client for Klook-related requests
 */
const klookApi = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://api.klktech.com/v3' 
        : 'https://sandbox-api.klktech.com/v3',
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
 * Fetch activity categories
 * @returns {Promise<Object>} Categories data
 */
export const fetchCategories = async () => {
    try {
        const response = await fetch('/api/activities/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Categories API response:', data);
        return data;
    } catch (error) {
        console.error('Categories API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch activities with pagination and filters
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Activities data
 */
export const fetchActivities = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams({
            limit: params.limit || '10',
            page: params.page || '1',
        });

        if (params.cityIds) queryParams.append('city_ids', params.cityIds);
        if (params.countryIds) queryParams.append('country_ids', params.countryIds);
        if (params.categoryIds) queryParams.append('category_ids', params.categoryIds);

        const response = await fetch(`/api/activities?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Activities API response:', data);

        // Return the complete response object with pagination info
        return {
            data: data.activity?.activity_list || [],
            total: data.activity?.total || 0,
            page: data.activity?.page || 1,
            limit: data.activity?.limit || 10,
            has_next: data.activity?.has_next || false,
            success: data.success || false,
        };
    } catch (error) {
        console.error('Activities API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

/**
 * Fetch activity details by ID
 * @param {string} id - Activity ID
 * @returns {Promise<Object>} Activity details
 */
export const fetchActivityDetails = async (id) => {
    try {
        const response = await fetch(`/api/activities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || {};
    } catch (error) {
        console.error('Activity Details API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};