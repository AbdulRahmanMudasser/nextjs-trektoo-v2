// src/app/api/hotel/booking/addToCart/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

/**
 * POST handler for adding a booking to the cart
 */
export async function POST(request) {
    try {
        const bookingData = await request.json();
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authentication token required' },
                { status: 401 }
            );
        }

        // Validate required fields
        const requiredFields = ['service_id', 'service_type', 'start_date', 'end_date', 'adults', 'children', 'rooms'];
        for (const field of requiredFields) {
            if (!bookingData[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const response = await axios.post(
            'https://staging.trektoo.com/api/booking/addToCart',
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
            }
        );

        if (response.data.status !== 1) {
            return NextResponse.json(
                { error: response.data.message || 'Failed to add to cart' },
                { status: 400 }
            );
        }

        console.info('Booking added to cart:', { booking_code: response.data.booking_code });

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
        console.error('Add to Cart error:', {
            message: error.message,
            stack: error.stack,
            status: error.response?.status,
        });

        return NextResponse.json(
            error.response?.data || { error: 'Failed to add to cart' },
            { status: error.response?.status || 500 }
        );
    }
}