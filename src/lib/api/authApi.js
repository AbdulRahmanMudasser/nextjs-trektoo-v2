import secureApiClient from './secureApiClient';
import { logError, getUserFriendlyError } from '@/lib/services/errorHandler';

// Login API call
export const login = async (credentials) => {
    try {
        // Validate input
        if (!credentials || typeof credentials !== 'object') {
            throw new Error('Invalid credentials provided');
        }

        if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required');
        }

        // Sanitize credentials
        const sanitizedCredentials = {
            email: credentials.email.trim().toLowerCase(),
            password: credentials.password,
            device_name: credentials.device_name || 'web'
        };

        const response = await secureApiClient.post('/auth/login', sanitizedCredentials);

        if (!response.data) {
            throw new Error('No response received from server');
        }

        // Check for API validation errors
        if (response.data.errors) {
            const errorMessages = Object.values(response.data.errors).flat();
            throw new Error(errorMessages.join(', '));
        }

        // Check for API error status
        if (response.data.status === 0 || response.data.status === false) {
            throw new Error(response.data.message || 'Login failed');
        }

        // Validate response structure
        if (!response.data.access_token || !response.data.user) {
            throw new Error('Invalid response format from server');
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
        // Validate input
        if (!userData || typeof userData !== 'object') {
            throw new Error('Invalid user data provided');
        }

        if (!userData.email || !userData.password) {
            throw new Error('Email and password are required');
        }

        // Sanitize user data
        const sanitizedUserData = {
            email: userData.email.trim().toLowerCase(),
            password: userData.password,
            first_name: userData.first_name?.trim() || '',
            last_name: userData.last_name?.trim() || '',
            phone: userData.phone?.trim() || '',
            country: userData.country?.trim() || ''
        };

        const response = await secureApiClient.post('/auth/register', sanitizedUserData);

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
        // Validate input
        if (!email || typeof email !== 'string') {
            throw new Error('Valid email is required for logout');
        }

        if (!token || typeof token !== 'string') {
            throw new Error('Valid authentication token is required for logout');
        }

        const response = await secureApiClient.post('/auth/logout', {
            email: email.trim().toLowerCase()
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
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
        // Validate token
        if (!token || typeof token !== 'string') {
            throw new Error('Valid authentication token is required');
        }

        const response = await secureApiClient.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data) {
            throw new Error('No response received from server');
        }

        // Validate response structure
        if (!response.data.data && !response.data.user) {
            throw new Error('Invalid user profile data received');
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
        // Validate inputs
        if (!token || typeof token !== 'string') {
            throw new Error('Valid authentication token is required');
        }

        if (!userData || typeof userData !== 'object') {
            throw new Error('Valid user data is required');
        }

        // Sanitize user data
        const sanitizedUserData = {
            first_name: userData.first_name?.trim() || '',
            last_name: userData.last_name?.trim() || '',
            email: userData.email?.trim().toLowerCase() || '',
            phone: userData.phone?.trim() || '',
            address: userData.address?.trim() || '',
            country: userData.country?.trim() || ''
        };

        const response = await secureApiClient.post('/auth/me', sanitizedUserData, {
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
        // Validate inputs
        if (!token || typeof token !== 'string') {
            throw new Error('Valid authentication token is required');
        }

        if (!page || page < 1) {
            page = 1;
        }

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