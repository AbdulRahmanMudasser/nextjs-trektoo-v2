/**
 * API route to handle hotel room prebook with secure credential management using Axios
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {Response} JSON response with prebook data or error
 */
import { NextResponse } from 'next/server';
import { sanitize } from 'isomorphic-dompurify';
import axios from 'axios';

/**
 * GET handler for hotel room prebook
 */
export async function GET(request, { params }) {
  const { roomId } = await params; // Await params to resolve dynamic route parameters
  const { searchParams } = new URL(request.url);

  // Input validation
  if (!roomId) {
    return NextResponse.json(
      { error: 'Invalid room ID' },
      { status: 400 }
    );
  }

  // Extract query parameters for room availability
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = searchParams.get('adults') || '1';
  const children = searchParams.get('children') || '0';

  try {
    // Prebook API only takes the book_hash, no query parameters
    const response = await axios.get(
      `http://api.trektoo.com/api/hotel/prebook/${roomId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log('🔍 Hotel Prebook API Call - URL:', `http://api.trektoo.com/api/hotel/prebook/${roomId}`);
    console.log('🔍 Hotel Prebook API Response Status:', response.status);
    console.log('🔍 Hotel Prebook API Response Headers:', response.headers);
    console.log('🔍 Hotel Prebook API Response Data:', response.data);

    // Check if the response contains an error (new API format)
    if (!response.data.success || response.data.success === false) {
      console.log('🔍 API returned error:', response.data);
      return NextResponse.json(
        {
          success: false,
          isAllowed: response.data.isAllowed || false,
          message: response.data.message || 'Prebook failed',
          error: response.data.message || 'Prebook failed'
        },
        { status: 400 }
      );
    }

    // Check for price changes
    if (response.data.changes && response.data.changes.price_changed === true) {
      return NextResponse.json(
        {
          success: false,
          isAllowed: false,
          message: 'Price has changed. Please refresh and try again.',
          price_changed: true,
          error: 'Price has changed. Please refresh and try again.'
        },
        { status: 400 }
      );
    }

    // Return the full response data as-is for successful responses
    const sanitizedData = {
      success: response.data.success || true,
      isAllowed: response.data.isAllowed || true,
      message: response.data.message || '',
      changes: response.data.changes || { price_changed: false },
      ...response.data // Include all original data
    };

    // Log successful request for monitoring
    console.info(`Hotel prebook successful for room ID: ${roomId}`);

    return NextResponse.json(
      sanitizedData,
      {
        headers: {
          'Content-Security-Policy': "default-src 'self';",
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('🔍 Hotel Prebook API Error:', error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 'Prebook request failed';
      const statusCode = error.response.status;

      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      );
    } else if (error.request) {
      // Request was made but no response received
      return NextResponse.json(
        { error: 'Unable to connect to booking service. Please try again.' },
        { status: 503 }
      );
    } else {
      // Something else happened
      return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again.' },
        { status: 500 }
      );
    }
  }
}