import secureApiClient from './secureApiClient';
import { logError, getUserFriendlyError } from '@/lib/services/errorHandler';

// Login API call
export const login = async (credentials) => {
    try {
        const response = await secureApiClient.post('/auth/login', credentials);
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Login API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

// Register API call
export const register = async (userData) => {
    try {
        const response = await secureApiClient.post('/auth/register', userData);
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Register API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

// Logout API call
export const logout = async (email, token) => {
    try {
        const response = await secureApiClient.post('/auth/logout', { email }, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Logout API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

// Get user profile API call
export const getUserProfile = async (token) => {
    try {
        const response = await secureApiClient.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Get User Profile API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

// Update user profile API call
export const updateUserProfile = async (userData, token) => {
    try {
        const response = await secureApiClient.post('/auth/me', userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Update User Profile API', error);
        throw new Error(getUserFriendlyError(error));
    }
};

// Get booking history API call
export const getBookingHistory = async (token, page = 1) => {
    try {
        const response = await secureApiClient.get(`/user/booking-history?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        logError('Booking History API', error);
        throw new Error(getUserFriendlyError(error));
    }
};