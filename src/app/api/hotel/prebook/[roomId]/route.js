import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  const { roomId } = await params;
  const { searchParams } = new URL(request.url);

  // Validate roomId
  if (!roomId) {
    return NextResponse.json(
      { error: 'Room ID is required' },
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
    // Build query parameters for external API
    const queryParams = new URLSearchParams({
      checkin,
      checkout,
      adults,
      children,
    });

    const apiUrl = `https://api.trektoo.com/api/hotel/prebook/${roomId}?${queryParams.toString()}`;

    console.log('🔍 Hotel Prebook API Call - URL:', apiUrl);
    console.log('🔍 Hotel Prebook API Call - Params:', { roomId, checkin, checkout, adults, children });

    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    console.log('🔍 Hotel Prebook API Response Status:', response.status);
    console.log('🔍 Hotel Prebook API Response Data:', response.data);

    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('🔍 Hotel Prebook API Error:', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('🔍 Error Response Status:', error.response.status);
      console.error('🔍 Error Response Data:', error.response.data);

      return NextResponse.json(
        {
          error: 'Failed to prebook hotel room',
          details: error.response.data?.message || error.response.data?.error || 'Unknown error',
          status: error.response.status,
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error('🔍 No Response Received:', error.request);
      return NextResponse.json(
        {
          error: 'No response from hotel service',
          details: 'The hotel service is currently unavailable. Please try again later.',
        },
        { status: 503 }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('🔍 Request Setup Error:', error.message);
      return NextResponse.json(
        {
          error: 'Internal server error',
          details: 'An unexpected error occurred while processing your request.',
        },
        { status: 500 }
      );
    }
  }
}

