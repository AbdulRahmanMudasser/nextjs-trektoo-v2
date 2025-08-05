/**
 * API route to handle activity detail requests with X-API-KEY authentication
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Response} JSON response with activity data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for activity details
 */
export async function GET(request, { params }) {
    const { id } = await params; // Await params to resolve dynamic route parameters

    // Input validation
    if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
            { error: 'Invalid activity ID' },
            { status: 400 }
        );
    }

    try {
        // Check if API key is configured
        if (!process.env.KLOOK_API_KEY) {
            console.error('KLOOK_API_KEY is not configured');
            return NextResponse.json(
                { error: 'API configuration missing' },
                { status: 500 }
            );
        }

        console.log(`Fetching activity details for ID: ${id}`);

        const response = await axios.get(
            `https://sandbox-api.klktech.com/v3/activities/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.KLOOK_API_KEY,
                    'Accept': 'application/json',
                    'Accept-Language': 'en_US',
                    'User-Agent': 'NextJS-App/1.0',
                },
                timeout: 30000, // 30-second timeout
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                },
            }
        );

        console.log('Activity details API response status:', response.status);
        console.log('Activity details API response structure:', {
            success: response.data?.success,
            hasActivity: !!response.data?.activity
        });

        if (!response.data || !response.data.success || !response.data.activity) {
            return NextResponse.json(
                { error: 'Activity not found' },
                { status: 404 }
            );
        }

        // Sanitize API response data
        const activity = response.data.activity;
        const sanitizedData = {
            ...activity,
            title: sanitize(activity.title || ''),
            sub_title: sanitize(activity.sub_title || ''),
            description: sanitize(activity.description || ''),
            content: sanitize(activity.content || ''),
            address: sanitize(activity.address || ''),
            image: sanitize(activity.image || ''),
            banner_image: sanitize(activity.banner_image || ''),
            gallery: (activity.gallery || []).map((url) => sanitize(url)),
            highlights: (activity.highlights || []).map((highlight) => sanitize(highlight)),
            itinerary: (activity.itinerary || []).map((item) => ({
                ...item,
                title: sanitize(item.title || ''),
                description: sanitize(item.description || ''),
            })),
        };

        // Log successful request for monitoring
        console.info(`Activity details fetched successfully for ID: ${id}`);

        return NextResponse.json(
            {
                success: true,
                data: sanitizedData,
            },
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'public, max-age=1800', // Cache for 30 minutes
                },
            }
        );
    } catch (error) {
        console.error('Activity details error:', {
            message: error.message,
            stack: error.stack,
            id,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                headers: error.config?.headers
            }
        });

        // Return appropriate error based on the type
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            return NextResponse.json(
                { error: 'Unable to connect to Klook API. Please check your internet connection.' },
                { status: 503 }
            );
        }

        if (error.response?.status === 401) {
            return NextResponse.json(
                { error: 'Invalid API credentials. Please check your KLOOK_API_KEY.' },
                { status: 401 }
            );
        }

        if (error.response?.status === 403) {
            return NextResponse.json(
                { error: 'Access forbidden. Please verify your API permissions.' },
                { status: 403 }
            );
        }

        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Activity not found' },
                { status: 404 }
            );
        }

        if (error.response?.status === 429) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { 
                error: 'Failed to fetch activity details',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: error.response?.status || 500 }
        );
    }
}