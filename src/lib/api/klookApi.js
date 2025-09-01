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

import { logError, getUserFriendlyError } from '@/lib/services/errorHandler';

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
        logError('Categories API', error);
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
        logError('Activities API', error);
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
        logError('Activity Details API', error);
        throw new Error(getUserFriendlyError(error));
    }
};