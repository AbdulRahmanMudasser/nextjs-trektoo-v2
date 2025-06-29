import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const credentials = await request.json();
        const response = await axios.post(
            'https://staging.trektoo.com/api/auth/login',
            credentials
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Login proxy error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });

        return NextResponse.json(
            error.response?.data || { error: 'Login failed' },
            { status: error.response?.status || 500 }
        );
    }
}