/**
 * API route to handle hotel search with secure credential management using Axios
 * @param {Request} request - The incoming request object
 * @returns {Response} JSON response with hotel data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for hotel search
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const locationId = sanitize(searchParams.get('location_id') || '');
    const checkin = sanitize(searchParams.get('checkin') || '');
    const checkout = sanitize(searchParams.get('checkout') || '');
    const adults = parseInt(sanitize(searchParams.get('adults') || '1'), 10);
    const children = parseInt(sanitize(searchParams.get('children') || '0'), 10);

    // Input validation
    if (!locationId || !checkin || !checkout || isNaN(adults) || isNaN(children)) {
        return NextResponse.json(
            { error: 'Missing or invalid required parameters' },
            { status: 400 }
        );
    }

    try {
        // Build query parameters for the new API
        const queryParams = new URLSearchParams({
            adults: adults.toString(),
            children: children.toString(),
            checkin: checkin,
            checkout: checkout,
            location_id: locationId,
            limit: searchParams.get('limit') || '15',
            page: searchParams.get('page') || '1'
        });

        const response = await axios.get(
            `http://api.trektoo.com/api/hotel/search?${queryParams.toString()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 30000, // 30 second timeout
            }
        );

        // const response = await axios.get(
        //     `https://staging.trektoo.com/api/hotel/search?location_id=${locationId}`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Basic ${Buffer.from(
        //                 `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
        //             ).toString('base64')}`,
        //         },
        //         // Equivalent to Next.js fetch revalidate for caching
        //         next: { revalidate: 3600 }, // Cache for 1 hour
        //     }
        // );

        // Check if the response contains an error (new API format)
        if (!response.data.success || response.data.success === false) {
            return NextResponse.json(
                { error: response.data.message || 'Failed to fetch hotels' },
                { status: 400 }
            );
        }

        // Sanitize API response data
        const sanitizedData = response.data.data.map((hotel) => ({
            ...hotel,
            title: sanitize(hotel.title?.trim() || 'Hotel Name Not Available'),
            content: sanitize(hotel.content || ''),
            image: sanitize(hotel.image || ''),
            // Map fields from the new API response format
            id: hotel.id,
            price: hotel.price || '0.00',
            sale_price: hotel.sale_price || hotel.price || '0.00',
            location: hotel.location || '',
            is_featured: hotel.is_featured || 0
        }));

        // Calculate pagination info since current_page and per_page are not provided
        const total = response.data.total || 0;
        const totalPages = response.data.total_pages || 1;
        const limit = parseInt(searchParams.get('limit') || '15', 10);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const currentPage = Math.min(page, totalPages);

        // Log successful request for monitoring
        console.info(`Hotel search completed for location_id: ${locationId}, results: ${total}`);

        return NextResponse.json(
            {
                success: response.data.success || true,
                isAllowed: response.data.isAllowed || true,
                message: response.data.message || '',
                total: total,
                total_pages: totalPages,
                current_page: currentPage,
                per_page: limit,
                data: sanitizedData
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
        console.error('Hotel search error:', {
            message: error.message,
            stack: error.stack,
            locationId,
            status: error.response?.status,
        });

        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: error.response?.status || 500 }
        );
    }
}