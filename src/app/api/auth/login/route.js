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
            'https://staging.trektoo.com/api/auth/login',
            credentials,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // 10-second timeout
            }
        );
        return NextResponse.json(response.data);
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