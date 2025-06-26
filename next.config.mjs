/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['staging.trektoo.com', 'images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 604800, // Cache images for 7 days
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Content-Security-Policy', value: "default-src 'self'" },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                ],
            },
        ];
    },
    env: {
        API_USERNAME: process.env.API_USERNAME,
        API_PASSWORD: process.env.API_PASSWORD,
    },
};

export default nextConfig;  