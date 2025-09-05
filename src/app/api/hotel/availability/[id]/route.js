import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for hotel availability
 */
export async function GET(request, { params }) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
            { error: 'Invalid hotel ID' },
            { status: 400 }
        );
    }

    // Extract query parameters
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';

    // Validate required parameters
    if (!checkin || !checkout) {
        return NextResponse.json(
            { error: 'Check-in and check-out dates are required' },
            { status: 400 }
        );
    }

    try {
        // Build query string for external API
        const queryParams = new URLSearchParams({
            checkin: checkin,
            checkout: checkout,
            adults: adults,
            children: children
        });

        // New API call with date and guest parameters
        const response = await axios.get(
            `https://staging.trektoo.com/api/hotel/availability/${id}?${queryParams.toString()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
                    ).toString('base64')}`,
                },
                next: { revalidate: 3600 },
            }
        );

        // Previous API call (commented out)
        // const response = await axios.get(
        //     `https://staging.trektoo.com/api/hotel/availability/${id}`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Basic ${Buffer.from(
        //                 `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
        //             ).toString('base64')}`,
        //         },
        //         next: { revalidate: 3600 },
        //     }
        // );

        if (response.data.status !== 1 || !response.data.rooms) {
            return NextResponse.json(
                { error: 'No rooms found' },
                { status: 404 }
            );
        }

        const rooms = response.data.rooms.map(room => ({
            ...room,
            title: sanitize(room.title || ''),
            size_html: sanitize(room.size_html || ''),
            beds_html: sanitize(room.beds_html || ''),
            adults_html: sanitize(room.adults_html || ''),
            children_html: sanitize(room.children_html || ''),
            price_html: sanitize(room.price_html || ''),
            price_text: sanitize(room.price_text || ''),
            image: sanitize(room.image || ''),
            gallery: (room.gallery || []).map(img => ({
                large: sanitize(img.large || ''),
                thumb: sanitize(img.thumb || ''),
            })),
            term_features: (room.term_features || []).map(feature => ({
                icon: sanitize(feature.icon || ''),
                title: sanitize(feature.title || ''),
            })),
        }));

        console.info(`Room availability fetched for hotel ID: ${id}, checkin: ${checkin}, checkout: ${checkout}, adults: ${adults}, children: ${children}`);

        return NextResponse.json(
            { data: rooms },
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'public, max-age=3600',
                },
            }
        );
    } catch (error) {
        console.error('Room availability error:', {
            message: error.message,
            stack: error.stack,
            id,
            status: error.response?.status,
        });

        return NextResponse.json(
            { error: 'Failed to fetch room availability' },
            { status: error.response?.status || 500 }
        );
    }
}