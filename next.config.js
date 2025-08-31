/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // NUCLEAR OPTION: Disable image optimization completely
    images: {
        unoptimized: true,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Security Headers
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), payment=()',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: https: http: blob: *",
                            "media-src 'self' https: http:",
                            "connect-src 'self' https: http: wss:",
                            "frame-src 'self' https://www.google.com https://www.youtube.com https://www.openstreetmap.org",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'none'",
                            "upgrade-insecure-requests",
                        ].join('; '),
                    },
                ],
            },
            // API routes specific headers
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                ],
            },
            // Static assets caching
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/images/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Redirects for security and SEO
    async redirects() {
        return [
            // Redirect HTTP to HTTPS (handled by hosting provider)
            {
                source: '/admin',
                destination: '/404',
                permanent: false,
            },
            {
                source: '/wp-admin',
                destination: '/404',
                permanent: false,
            },
            {
                source: '/phpmyadmin',
                destination: '/404',
                permanent: false,
            },
        ];
    },

    // Webpack configuration for optimization
    webpack: (config, { dev, isServer }) => {
        // Production optimizations
        if (!dev && !isServer) {
            // Enable tree shaking
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;

            // Bundle analyzer (optional)
            if (process.env.ANALYZE === 'true') {
                const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
                config.plugins.push(
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        openAnalyzer: false,
                    })
                );
            }
        }

        // Security: Prevent access to sensitive files
        config.module.rules.push({
            test: /\.(env|config|secret)/,
            use: 'ignore-loader',
        });

        return config;
    },

    // Optimize package imports
    optimizePackageImports: [
        'lucide-react',
        'framer-motion',
        'react-intersection-observer',
    ],

    // Environment variables
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },

    // Compiler options
    compiler: {
        // Remove console.log in production
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Output configuration
    output: 'standalone',

    // Trailing slash configuration
    trailingSlash: false,

    // Powered by header
    poweredByHeader: false,

    // Generate build ID
    generateBuildId: async () => {
        return `build-${Date.now()}`;
    },

    // On-demand ISR (Incremental Static Regeneration)
    onDemandEntries: {
        // Period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // Number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },

    // Custom server configuration
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: process.env.MY_SECRET,
    },

    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
        apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://staging.trektoo.com/api',
    },
};

module.exports = nextConfig;
