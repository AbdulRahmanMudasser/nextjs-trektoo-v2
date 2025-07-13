import axios from 'axios';

const authApi = axios.create({
    baseURL: '/api/auth', // Use local proxy routes
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Helper function to format errors for logging
const formatError = (error) => ({
    message: error.message || 'Unknown error',
    status: error.response?.status || 'No status',
    data: error.response?.data || 'No data',
    stack: error.stack || 'No stack trace',
});

// Convert technical errors to user-friendly messages
const getUserFriendlyError = (error) => {
    if (!error.response) {
        return 'Unable to connect to the server. Please check your internet and try again.';
    }
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 400) {
        return data?.message ? Object.values(data.message).flat().join(', ') : 'Invalid request. Please try again.';
    }
    if (status === 401) {
        return 'Authentication failed. Please log in again.';
    }
    if (status === 403) {
        return 'You are not allowed to perform this action. Contact support.';
    }
    if (status === 404) {
        return 'Service unavailable. Please try again later.';
    }
    if (status === 429) {
        return 'Too many attempts. Please wait a few minutes and try again.';
    }
    if (status >= 500) {
        return 'Something went wrong on our server. Please try again later.';
    }
    return data?.message || 'An unexpected error occurred. Please try again.';
};

// Login API call
export const login = async (credentials) => {
    try {
        const response = await authApi.post('/login', credentials);
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Login API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

// Register API call
export const register = async (userData) => {
    try {
        const response = await authApi.post('/register', userData);
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Register API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

// Logout API call
export const logout = async (email, token) => {
    try {
        const response = await authApi.post('/logout', { email }, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Logout API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

// Get user profile API call
export const getUserProfile = async (token) => {
    try {
        const response = await authApi.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Get user profile API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

// Update user profile API call
export const updateUserProfile = async (userData, token) => {
    try {
        const response = await authApi.post('/me', userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data) {
            throw new Error('No response received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Update user profile API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};