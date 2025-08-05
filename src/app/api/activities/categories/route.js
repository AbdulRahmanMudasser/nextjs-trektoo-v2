/**
 * API route to handle activity categories requests with X-API-KEY authentication and language support
 * @param {Request} request - The incoming request object
 * @returns {Response} JSON response with categories data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for activity categories
 */
export async function GET(request) {
    try {
        // Check if API key is configured
        if (!process.env.KLOOK_API_KEY) {
            console.error('KLOOK_API_KEY is not configured');
            return NextResponse.json(
                { error: 'API configuration missing' },
                { status: 500 }
            );
        }

        // Get language from query params or use default (note: Klook uses underscore format)
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || process.env.KLOOK_API_LANGUAGE || 'en_US';

        console.log('Fetching categories from Klook API with language:', language);

        const response = await axios.get(
            'https://sandbox-api.klktech.com/v3/products/categories',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.KLOOK_API_KEY,
                    'Accept': 'application/json',
                    'Accept-Language': language,
                    'User-Agent': 'NextJS-App/1.0',
                },
                timeout: 30000, // 30 second timeout
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // Accept only 2xx status codes
                },
            }
        );

        console.log('Categories API response status:', response.status);
        console.log('Categories API response data structure:', {
            success: response.data?.success,
            categoriesCount: response.data?.categories?.length || 0
        });

        if (!response.data || response.data.success === false) {
            console.warn('Categories API returned unsuccessful response:', response.data);
            
            // If there's an error in the response, log it
            if (response.data?.error) {
                console.error('Klook API Error:', response.data.error);
                return NextResponse.json(
                    { 
                        error: 'Klook API Error', 
                        details: response.data.error.message || 'Unknown error',
                        code: response.data.error.code || 'unknown'
                    },
                    { status: response.data.error.status || 400 }
                );
            }
            
            return NextResponse.json(
                { error: 'Categories data not available' },
                { status: 404 }
            );
        }

        // Check if categories exist in response
        if (!response.data.categories || !Array.isArray(response.data.categories)) {
            console.warn('No categories array found in response');
            // Return basic categories for development
            return NextResponse.json(
                {
                    success: true,
                    categories: [
                        { id: 101, name: 'THINGS TO DO', sub_category: null },
                        { id: 158, name: 'POINT-TO-POINT TICKET', sub_category: null },
                        { id: 170, name: 'PUBLIC TRANSPORTATION', sub_category: null },
                        { id: 182, name: 'CAR SERVICES', sub_category: null },
                        { id: 200, name: 'WIFI & SIM', sub_category: null },
                        { id: 210, name: 'TRAVEL CONVENIENCE', sub_category: null },
                        { id: 234, name: 'FOOD & DINING', sub_category: null },
                        { id: 246, name: 'HOTEL', sub_category: null },
                    ],
                },
                {
                    headers: {
                        'Content-Security-Policy': "default-src 'self';",
                        'X-Content-Type-Options': 'nosniff',
                        'Cache-Control': 'public, max-age=1800',
                    },
                }
            );
        }

        // Sanitize API response data
        const sanitizedCategories = response.data.categories.map(category => ({
            ...category,
            name: sanitize(category.name || ''),
            sub_category: category.sub_category ? category.sub_category.map(sub => ({
                ...sub,
                name: sanitize(sub.name || ''),
                leaf_category: sub.leaf_category ? sub.leaf_category.map(leaf => ({
                    ...leaf,
                    name: sanitize(leaf.name || '')
                })) : null
            })) : null
        }));

        // Log successful request for monitoring
        console.info('Activity categories fetched successfully:', sanitizedCategories.length, 'categories');

        return NextResponse.json(
            {
                success: true,
                categories: sanitizedCategories,
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
        console.error('Categories API error:', {
            message: error.message,
            stack: error.stack,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
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
                error: 'Failed to fetch categories',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: error.response?.status || 500 }
        );
    }
}