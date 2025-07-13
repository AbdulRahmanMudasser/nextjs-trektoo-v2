import { NextResponse } from 'next/server';
import axios from 'axios';
import { sanitize } from 'isomorphic-dompurify';

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
        console.warn('No valid Bearer token provided, attempting Basic auth');
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Prefer Bearer token if provided, otherwise fall back to Basic auth
        if (authHeader && authHeader.startsWith('Bearer ')) {
            headers.Authorization = authHeader;
        } else {
            headers.Authorization = `Basic ${Buffer.from(
                `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
            ).toString('base64')}`;
        }

        const response = await axios.get(
            `https://staging.trektoo.com/api/booking/${bookingCode}`,
            {
                headers,
                next: { revalidate: 3600 },
            }
        );

        if (response.data.status !== 1) {
            return NextResponse.json(
                { error: response.data.message || 'Failed to fetch booking details' },
                { status: 400 }
            );
        }

        // Sanitize relevant fields in the response
        const sanitizedData = {
            ...response.data,
            booking: {
                ...response.data.booking,
                code: sanitize(response.data.booking.code || ''),
                first_name: sanitize(response.data.booking.first_name || ''),
                last_name: sanitize(response.data.booking.last_name || ''),
                email: sanitize(response.data.booking.email || ''),
                phone: sanitize(response.data.booking.phone || ''),
                address: sanitize(response.data.booking.address || '') || null,
                city: sanitize(response.data.booking.city || '') || null,
                state: sanitize(response.data.booking.state || '') || null,
                zip_code: sanitize(response.data.booking.zip_code || '') || null,
                country: sanitize(response.data.booking.country || '') || null,
                customer_notes: sanitize(response.data.booking.customer_notes || '') || null,
                buyer_fees: response.data.booking.buyer_fees
                    ? JSON.parse(response.data.booking.buyer_fees).map(fee => ({
                        ...fee,
                        name: sanitize(fee.name || ''),
                        desc: sanitize(fee.desc || ''),
                        price: sanitize(fee.price || ''),
                    }))
                    : [],
                service: {
                    ...response.data.booking.service,
                    title: sanitize(response.data.booking.service.title || ''),
                    content: sanitize(response.data.booking.service.content || ''),
                    address: sanitize(response.data.booking.service.address || ''),
                    gallery: (response.data.booking.service.gallery || '').split(',').map(id => sanitize(id)),
                    video: sanitize(response.data.booking.service.video || ''),
                    policy: response.data.booking.service.policy.map(policy => ({
                        title: sanitize(policy.title || ''),
                        content: sanitize(policy.content || ''),
                    })),
                    badge_tags: response.data.booking.service.badge_tags.map(tag => ({
                        title: sanitize(tag.title || ''),
                        color: sanitize(tag.color || ''),
                    })),
                },
            },
            gateway: {
                ...response.data.gateway,
                name: sanitize(response.data.gateway.name || ''),
            },
        };

        console.info('Booking details fetched:', { booking_code: bookingCode, sanitized: true });

        return NextResponse.json(
            sanitizedData,
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'public, max-age=3600',
                },
            }
        );
    } catch (error) {
        console.error('Fetch Booking Details error:', {
            message: error.message,
            stack: error.stack,
            status: error.response?.status,
            bookingCode,
        });

        return NextResponse.json(
            error.response?.data || { error: 'Failed to fetch booking details' },
            { status: error.response?.status || 500 }
        );
    }
}