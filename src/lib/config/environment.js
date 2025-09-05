/**
 * Environment Configuration
 * Centralized configuration for API endpoints and environment-specific settings
 */

const ENV = process.env.NODE_ENV || 'development';


// API Configuration
const API_CONFIG = {
    // Base URLs - Use environment variables in production
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://staging.trektoo.com/api/',
    STAGING_URL: 'https://staging.trektoo.com/api/',
    PRODUCTION_URL: 'https://api.trektoo.com',

    // Timeouts
    TIMEOUT: 30000, // 30 seconds

    // Retry configuration
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,

    // Rate limiting
    RATE_LIMIT: {
        MAX_REQUESTS: 100,
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    },
};


// Security Configuration
const SECURITY_CONFIG = {
    // Token configuration
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry

    // Password requirements
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIREMENTS: {
        UPPERCASE: true,
        LOWERCASE: true,
        NUMBERS: true,
        SPECIAL_CHARS: true,
    },

    // Session security
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
};

// Payment Configuration
const PAYMENT_CONFIG = {
    // Supported payment methods
    SUPPORTED_METHODS: ['card', 'paypal', 'bank_transfer'],

    // Currency configuration
    DEFAULT_CURRENCY: 'USD',
    SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'AED'],

    // Payment security
    MIN_AMOUNT: 1.00,
    MAX_AMOUNT: 10000.00,

    // 3D Secure
    REQUIRE_3DS: true,

    // Fraud prevention
    FRAUD_CHECK_ENABLED: true,
};

// Feature Flags
const FEATURES = {
    // Development features
    DEBUG_MODE: ENV === 'development',
    LOGGING_ENABLED: ENV === 'development',

    // Production features
    ANALYTICS_ENABLED: ENV === 'production',
    ERROR_TRACKING: ENV === 'production',
    PERFORMANCE_MONITORING: ENV === 'production',

    // Payment features
    PAYMENT_PROCESSING: true,
    WALLET_FEATURE: false, // Coming soon

    // Social features
    SOCIAL_LOGIN: false, // Coming soon
    REVIEWS_SYSTEM: true,
};

// Performance Configuration
const PERFORMANCE_CONFIG = {
    // Image optimization
    IMAGE_QUALITY: 80,
    IMAGE_FORMATS: ['webp', 'avif', 'jpeg'],

    // Caching
    STATIC_CACHE_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days
    API_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

    // Lazy loading
    LAZY_LOAD_THRESHOLD: 0.1,

    // Bundle optimization
    CODE_SPLITTING: true,
    TREE_SHAKING: true,
};

// Validation Rules
const VALIDATION_RULES = {
    // Email validation
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Phone validation (international)
    PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,

    // Name validation
    NAME_REGEX: /^[a-zA-Z\s'-]{2,50}$/,

    // Credit card validation
    CARD_REGEX: /^[0-9]{13,19}$/,

    // CVV validation
    CVV_REGEX: /^[0-9]{3,4}$/,
};

// Error Messages
const ERROR_MESSAGES = {
    // Authentication
    INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
    ACCOUNT_LOCKED: 'Account temporarily locked due to multiple failed attempts.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',

    // Payment
    PAYMENT_FAILED: 'Payment processing failed. Please try again.',
    INSUFFICIENT_FUNDS: 'Insufficient funds. Please use a different payment method.',
    CARD_DECLINED: 'Card was declined. Please check your card details.',

    // Validation
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    INVALID_NAME: 'Please enter a valid name (2-50 characters).',

    // Network
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
};

// Logging Configuration
const LOGGING_CONFIG = {
    LEVEL: ENV === 'production' ? 'error' : 'debug',
    ENABLE_CONSOLE: ENV === 'development',
    ENABLE_REMOTE: ENV === 'production',
    REMOTE_ENDPOINT: process.env.NEXT_PUBLIC_LOGGING_ENDPOINT,

    // Sensitive data masking
    MASK_FIELDS: ['password', 'token', 'card_number', 'cvv', 'ssn'],
};

module.exports = {
    ENV,
    API_CONFIG,
    SECURITY_CONFIG,
    PAYMENT_CONFIG,
    FEATURES,
    PERFORMANCE_CONFIG,
    VALIDATION_RULES,
    ERROR_MESSAGES,
    LOGGING_CONFIG,
};
