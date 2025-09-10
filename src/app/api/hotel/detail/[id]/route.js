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
    const { searchParams } = new URL(request.url);

    // Input validation
    if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
            { error: 'Invalid hotel ID' },
            { status: 400 }
        );
    }

    // Extract query parameters for room availability
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';

    try {
        // Build query parameters for the new API - following hotel search pattern
        const queryParams = new URLSearchParams({
            adults: adults,
            children: children,
            checkin: checkin || '2025-12-12',
            checkout: checkout || '2025-12-14'
        });

        const response = await axios.get(
            `http://api.trektoo.com/api/hotel/detail/${id}?${queryParams.toString()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 30000, // 30 second timeout
            }
        );

        // Check if the response contains an error (new API format)
        if (!response.data.success || response.data.success === false) {
            return NextResponse.json(
                { error: response.data.message || 'Hotel not found' },
                { status: 404 }
            );
        }

        // Sanitize API response data - handle new response format
        const hotel = response.data;
        const sanitizedData = {
            id: hotel.id,
            title: sanitize(hotel.title || ''),
            price: hotel.price || '0.00',
            sale_price: hotel.sale_price || hotel.price || '0.00',
            image: sanitize(hotel.image || ''),
            content: sanitize(hotel.content || ''),
            location: hotel.location || '',
            is_featured: hotel.is_featured || 0,
            rooms: hotel.rooms || null,
            // Add additional fields for compatibility
            address: hotel.address || '',
            banner_image: hotel.banner_image || hotel.image,
            gallery: hotel.gallery || [hotel.image].filter(Boolean),
            policy: hotel.policy || [],
            map_lat: hotel.map_lat || '0',
            map_lng: hotel.map_lng || '0',
            map_zoom: hotel.map_zoom || 10,
            review_score: hotel.review_score || {
                score_total: 0,
                total_review: 0,
                score_text: 'Not rated'
            },
            terms: hotel.terms || {},
            object_model: hotel.object_model || 'hotel',
            discount_percent: hotel.discount_percent || null,
            video: hotel.video || null,
            enable_extra_price: hotel.enable_extra_price || 0,
            extra_price: hotel.extra_price || null
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