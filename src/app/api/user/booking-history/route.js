import { NextResponse } from 'next/server';
import axios from 'axios';

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
    if (status === 429) {
        return 'Too many attempts. Please wait a few minutes and try again.';
    }
    if (status >= 500) {
        return 'Something went wrong on our server. Please try again later.';
    }
    return data?.message || 'An unexpected error occurred. Please try again.';
};

export async function GET(request) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Authentication token required' }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const response = await axios.get(`https://staging.trektoo.com/api/user/booking-history?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Booking history proxy error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            stack: error.stack,
        });
        const userFriendlyMessage = getUserFriendlyError(error);
        return NextResponse.json({ error: userFriendlyMessage }, { status: error.response?.status || 500 });
    }
}