'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, logout as logoutApi } from '@/lib/api/authApi';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(null);
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const clearMessages = () => {
        setAuthError(null);
        setAuthSuccess(null);
    };

    const login = async (credentials) => {
        clearMessages();
        try {
            const data = await loginApi(credentials);
            if (data.status === 1 && data.access_token) {
                localStorage.setItem('authToken', data.access_token);
                localStorage.setItem('authUser', JSON.stringify(data.user));
                setToken(data.access_token);
                setUser(data.user);
                setAuthSuccess('Login successful!');
                router.push('/');
            }
        } catch (error) {
            const errorData = error.response?.data;
            setAuthError(errorData?.message || 'Login failed');
            throw error;
        }
    };

    const register = async (userData) => {
        clearMessages();
        try {
            const data = await registerApi(userData);
            if (data.status === true) {
                setAuthSuccess(data.message || 'Registration successful!');
                router.push('/login');
            }
        } catch (error) {
            const errorData = error.response?.data;
            setAuthError(
                typeof errorData?.message === 'object'
                    ? Object.values(errorData.message).flat().join('\n')
                    : errorData?.message || 'Registration failed'
            );
            throw error;
        }
    };

    const logout = async () => {
        clearMessages();
        try {
            // await logoutApi();
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            setToken(null);
            setUser(null);
            queryClient.clear();
            router.push('/');
        }
    };

    return {
        user,
        token,
        login,
        register,
        logout,
        authError,
        authSuccess,
        clearMessages,
        isAuthenticated: !!token,
    };
};