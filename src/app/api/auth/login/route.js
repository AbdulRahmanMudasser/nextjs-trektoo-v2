import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const credentials = await request.json();
        if (!credentials.email || !credentials.password) {
            return NextResponse.json(
                { error: 'Please provide both email and password' },
                { status: 400 }
            );
        }
        const response = await axios.post(
            'https://api.trektoo.com/api/auth/login',
            credentials,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // 10-second timeout
            }
        );

        // Check if the response contains an error (new API format)
        if (response.data.success === false || response.data.isAllowed === false) {
            // Handle API error response format
            const errorCode = response.data.code;
            const errorMessage = response.data.message;

            // Map error codes to user-friendly messages
            const errorCodeMap = {
                'invalid_credentials': 'Invalid email or password. Please check your credentials and try again.',
                'user_not_found': 'No account found with this email address. Please check your email or sign up.',
                'account_locked': 'Account temporarily locked due to multiple failed attempts. Please try again later.',
                'weak_password': 'Password is too weak. Please choose a stronger password.',
                'invalid_email': 'Please enter a valid email address.',
                'session_expired': 'Your session has expired. Please log in again.',
                'rate_limit_exceeded': 'Too many attempts. Please wait a moment before trying again.',
                'server_error': 'Something went wrong on our server. Please try again later.'
            };

            const userFriendlyMessage = errorCodeMap[errorCode] || errorMessage || 'Login failed. Please try again.';

            return NextResponse.json(
                { error: userFriendlyMessage },
                { status: 400 } // Return 400 for client errors
            );
        }

        // Transform response to match expected format
        const transformedResponse = {
            status: 1,
            access_token: response.data.token,
            user: response.data.user,
            message: response.data.message
        };

        return NextResponse.json(transformedResponse);
    } catch (error) {
        console.error('Login proxy error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            stack: error.stack,
        });
        const userFriendlyMessage = getUserFriendlyError(error);
        return NextResponse.json(
            { error: userFriendlyMessage },
            { status: error.response?.status || 500 }
        );
    }
}

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