import axios from 'axios';

const authApi = axios.create({
    baseURL: '/api/auth',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const login = async (credentials) => {
    try {
        const response = await authApi.post('/login', credentials);

        // console.log(response);

        return response.data;
    } catch (error) {
        console.error('Login API error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            stack: error.stack,
        });
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await authApi.post('/register', userData);

        // console.log(response);

        return response.data;
    } catch (error) {
        console.error('Register API error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            stack: error.stack,
        });
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await authApi.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Logout API error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        throw error;
    }
};