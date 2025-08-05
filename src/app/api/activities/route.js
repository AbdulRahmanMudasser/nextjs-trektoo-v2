/**
 * API route to handle activities requests with X-API-KEY authentication
 * @param {Request} request - The incoming request object
 * @returns {Response} JSON response with activities data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for activities
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters with defaults
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const cityIds = searchParams.get('city_ids') || '';
    const countryIds = searchParams.get('country_ids') || '';
    const categoryIds = searchParams.get('category_ids') || '';

    // Input validation
    if (limit > 100 || limit < 1) {
        return NextResponse.json(
            { error: 'Limit must be between 1 and 100' },
            { status: 400 }
        );
    }

    if (page < 1) {
        return NextResponse.json(
            { error: 'Page must be greater than 0' },
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

        // Build query string
        const queryParams = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
        });

        // Only add non-empty filter parameters
        if (cityIds && cityIds.trim()) {
            queryParams.append('city_ids', cityIds.trim());
        }
        if (countryIds && countryIds.trim()) {
            queryParams.append('country_ids', countryIds.trim());
        }
        if (categoryIds && categoryIds.trim()) {
            queryParams.append('category_ids', categoryIds.trim());
        }

        const apiUrl = `https://sandbox-api.klktech.com/v3/activities?${queryParams.toString()}`;
        console.log('Fetching activities from:', apiUrl);

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.KLOOK_API_KEY,
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
                'User-Agent': 'NextJS-App/1.0',
            },
            timeout: 30000, // 30 second timeout
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
        });

        console.log('Activities API response status:', response.status);
        console.log('Activities API response structure:', {
            success: response.data?.success,
            hasActivity: !!response.data?.activity,
            activityListLength: response.data?.activity?.activity_list?.length || 0,
            total: response.data?.activity?.total || 0
        });

        if (!response.data || !response.data.success) {
            console.warn('Activities API returned unsuccessful response');
            
            // Return mock data for development if API fails
            return NextResponse.json(
                {
                    success: true,
                    activity: {
                        total: 0,
                        page: page,
                        limit: limit,
                        has_next: false,
                        activity_list: []
                    }
                },
                {
                    headers: {
                        'Content-Security-Policy': "default-src 'self';",
                        'X-Content-Type-Options': 'nosniff',
                        'Cache-Control': 'public, max-age=900',
                    },
                }
            );
        }

        // Check if activity data exists
        if (!response.data.activity) {
            console.warn('No activity data found in response');
            return NextResponse.json(
                {
                    success: true,
                    activity: {
                        total: 0,
                        page: page,
                        limit: limit,
                        has_next: false,
                        activity_list: []
                    }
                },
                {
                    headers: {
                        'Content-Security-Policy': "default-src 'self';",
                        'X-Content-Type-Options': 'nosniff',
                        'Cache-Control': 'public, max-age=900',
                    },
                }
            );
        }

        // Sanitize API response data
        const activityList = response.data.activity.activity_list || [];
        const sanitizedActivities = activityList.map(activity => ({
            ...activity,
            title: sanitize(activity.title || ''),
            sub_title: sanitize(activity.sub_title || ''),
        }));

        const sanitizedResponse = {
            success: true,
            activity: {
                total: response.data.activity.total || 0,
                page: response.data.activity.page || page,
                limit: response.data.activity.limit || limit,
                has_next: response.data.activity.has_next || false,
                activity_list: sanitizedActivities
            }
        };

        // Log successful request for monitoring
        console.info(`Activities fetched - Page: ${page}, Limit: ${limit}, Results: ${sanitizedActivities.length}, Total: ${response.data.activity.total}`);

        return NextResponse.json(
            sanitizedResponse,
            {
                headers: {
                    'Content-Security-Policy': "default-src 'self';",
                    'X-Content-Type-Options': 'nosniff',
                    'Cache-Control': 'public, max-age=900', // Cache for 15 minutes
                },
            }
        );
    } catch (error) {
        console.error('Activities API error:', {
            message: error.message,
            stack: error.stack,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            page,
            limit,
            filters: { cityIds, countryIds, categoryIds },
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

        if (error.response?.status === 429) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { 
                error: 'Failed to fetch activities',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: error.response?.status || 500 }
        );
    }
}