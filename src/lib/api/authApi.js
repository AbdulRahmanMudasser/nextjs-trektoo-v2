import secureApiClient from './secureApiClient';
import { logError, getUserFriendlyError } from '@/lib/services/errorHandler';

// Enhanced error handling for authentication
const handleAuthError = (error, operation) => {
    console.log(`handleAuthError called for ${operation}:`, error);
    logError(`${operation} API`, error);

    // Handle specific HTTP status codes
    if (error.response) {
        const { status, data } = error.response;
        console.log(`HTTP ${status} error:`, data);

        switch (status) {
            case 401:
                return 'Invalid email or password. Please check your credentials and try again.';
            case 422:
                // Validation errors from Laravel
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat();
                    return errorMessages.join(', ');
                }
                // Handle validation errors in message field
                if (data.message && typeof data.message === 'object') {
                    const errorMessages = Object.values(data.message).flat();
                    return errorMessages.join(', ');
                }
                return data.message || 'Please check your input and try again.';
            case 429:
                return 'Too many attempts. Please wait a moment before trying again.';
            case 500:
                return 'Server error. Please try again later.';
            default:
                // Handle API-specific error status (status: 0)
                if (data.message && typeof data.message === 'object') {
                    const errorMessages = Object.values(data.message).flat();
                    return errorMessages.join(', ');
                }
                return data.message || getUserFriendlyError(error);
        }
    }

    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        return 'Network error. Please check your internet connection and try again.';
    }

    // Handle API validation errors that come as Error objects with validation messages
    if (error.message && typeof error.message === 'string' && error.message.includes(',')) {
        // This is likely a validation error message we constructed
        return error.message;
    }

    const friendlyError = getUserFriendlyError(error);
    console.log('Using getUserFriendlyError:', friendlyError);
    return typeof friendlyError === 'string' ? friendlyError : 'An unexpected error occurred. Please try again.';
};

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

        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email.trim())) {
            throw new Error('Please enter a valid email address');
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
        throw new Error(handleAuthError(error, 'Login'));
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

        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email.trim())) {
            throw new Error('Please enter a valid email address');
        }

        // Password strength validation
        if (userData.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Name validation
        if (userData.first_name && userData.first_name.trim().length < 2) {
            throw new Error('First name must be at least 2 characters long');
        }

        if (userData.last_name && userData.last_name.trim().length < 2) {
            throw new Error('Last name must be at least 2 characters long');
        }

        // Terms validation
        if (!userData.terms && !userData.term) {
            throw new Error('You must agree to the terms and conditions');
        }

        // Sanitize user data - API expects 'term' not 'terms'
        const sanitizedUserData = {
            email: userData.email.trim().toLowerCase(),
            password: userData.password,
            first_name: userData.first_name?.trim() || '',
            last_name: userData.last_name?.trim() || '',
            term: userData.terms || userData.term
        };

        const response = await secureApiClient.post('/auth/register', sanitizedUserData);

        if (!response.data) {
            throw new Error('No response received from server');
        }

        // Check for API error status first
        if (response.data.status === 0 || response.data.status === false) {
            // Handle validation errors in message field
            if (response.data.message && typeof response.data.message === 'object') {
                const errorMessages = Object.values(response.data.message).flat();
                throw new Error(errorMessages.join(', '));
            }
            // Handle simple error message
            throw new Error(response.data.message || 'Registration failed');
        }

        // Check for API validation errors in errors field
        if (response.data.errors) {
            const errorMessages = Object.values(response.data.errors).flat();
            throw new Error(errorMessages.join(', '));
        }

        return response.data;
    } catch (error) {
        // If this is already a validation error with a proper message, just re-throw it
        if (error.message && typeof error.message === 'string' &&
            (error.message.includes('required') ||
                error.message.includes('already been taken') ||
                error.message.includes('invalid') ||
                error.message.includes('must be'))) {
            throw error;
        }

        const errorMessage = handleAuthError(error, 'Register');
        // Ensure we always throw a proper Error object with a string message
        const finalMessage = typeof errorMessage === 'string' ? errorMessage : 'Registration failed. Please try again.';
        throw new Error(finalMessage);
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
        // For logout, we don't want to throw errors that would prevent the user from logging out
        // Just log the error and return a success response
        logError('Logout API', error);
        return { status: true, message: 'Logged out successfully' };
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