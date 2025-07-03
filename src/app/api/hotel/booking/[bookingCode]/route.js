// src/app/api/hotel/booking/[bookingCode]/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

/**
 * GET handler for fetching booking details
 */
export async function GET(request, { params }) {
    const { bookingCode } = params;
    const authHeader = request.headers.get('Authorization');

    if (!bookingCode) {
        return NextResponse.json(
            { error: 'Booking code required' },
            { status: 400 }
        );
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Authentication token required' },
            { status: 401 }
        );
    }

    try {
        const response = await axios.get(
            `https://staging.trektoo.com/api/booking/${bookingCode}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
            }
        );

        if (response.data.status !== 1) {
            return NextResponse.json(
                { error: response.data.message || 'Failed to fetch booking details' },
                { status: 400 }
            );
        }

        console.info('Booking details fetched:', { booking_code: bookingCode });

        return NextResponse.json(
            response.data,
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        );
    } catch (error) {
        console.error('Fetch Booking Details error:', {
            message: error.message,
            stack: error.stack,
            status: error.response?.status,
        });

        return NextResponse.json(
            error.response?.data || { error: 'Failed to fetch booking details' },
            { status: error.response?.status || 500 }
        );
    }
}