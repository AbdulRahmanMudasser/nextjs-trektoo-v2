/**
 * API route to handle hotel detail requests with secure credential management using Axios
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Response} JSON response with hotel data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for hotel details
 */
export async function GET(request, { params }) {
    const { id } = await params; // Await params to resolve dynamic route parameters

    // Input validation
    if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
            { error: 'Invalid hotel ID' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(
            `https://staging.trektoo.com/api/hotel/detail/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
                    ).toString('base64')}`,
                },
                // Equivalent to Next.js fetch revalidate for caching
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (response.data.status !== 1 || !response.data.data) {
            return NextResponse.json(
                { error: 'Hotel not found' },
                { status: 404 }
            );
        }

        // Sanitize API response data
        const hotel = response.data.data;
        const sanitizedData = {
            ...hotel,
            title: sanitize(hotel.title || ''),
            content: sanitize(hotel.content || ''),
            address: sanitize(hotel.address || ''),
            image: sanitize(hotel.image || ''),
            banner_image: sanitize(hotel.banner_image || ''),
            gallery: (hotel.gallery || []).map((url) => sanitize(url)),
            policy: (hotel.policy || []).map((p) => sanitize(p)),
        };

        // Log successful request for monitoring
        console.info(`Hotel details fetched for ID: ${id}`);

        return NextResponse.json(
            {
                data: sanitizedData,
            },
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'public, max-age=3600',
                },
            }
        );
    } catch (error) {
        console.error('Hotel details error:', {
            message: error.message,
            stack: error.stack,
            id,
            status: error.response?.status,
        });

        return NextResponse.json(
            { error: 'Failed to fetch hotel details' },
            { status: error.response?.status || 500 }
        );
    }
}