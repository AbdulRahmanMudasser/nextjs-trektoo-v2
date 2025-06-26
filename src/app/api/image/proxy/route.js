/**
 * API route to proxy image requests with authentication
 * @param {Request} request - The incoming request object
 * @returns {Response} Proxied image response
 */
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
                ).toString('base64')}`,
            },
        });

        return new NextResponse(response.data, {
            status: 200,
            headers: {
                'Content-Type': response.headers['content-type'],
                'Cache-Control': 'public, max-age=604800', // Cache for 7 days
            },
        });
    } catch (error) {
        console.error('Image proxy error:', {
            message: error.message,
            status: error.response?.status,
            stack: error.stack,
        });
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: error.response?.status || 500 });
    }
}