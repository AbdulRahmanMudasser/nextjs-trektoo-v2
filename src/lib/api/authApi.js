import axios from 'axios';

const authApi = axios.create({
    baseURL: '/api/auth',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10-second timeout to avoid hanging
});

// Helper function to format errors for logging
const formatError = (error) => ({
    message: error.message || 'Unknown error',
    status: error.response?.status || 'No status',
    data: error.response?.data || 'No data',
    stack: error.stack || 'No stack trace',
});

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
export const logout = async () => {
    try {
        const response = await authApi.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Logout API error:', formatError(error));
        throw new Error(getUserFriendlyError(error));
    }
};

// Convert technical errors to user-friendly messages
const getUserFriendlyError = (error) => {
    if (!error.response) {
        return 'Unable to connect to the server. Please check your internet and try again.';
    }
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 400) {
        return data?.message || 'Invalid email or password. Please try again.';
    }
    if (status === 401) {
        return 'Incorrect email or password. Please check your details.';
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