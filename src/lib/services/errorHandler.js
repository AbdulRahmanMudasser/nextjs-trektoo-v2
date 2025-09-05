/**
 * Centralized Error Handling Service
 * Consolidates all error handling logic across the application
 */

const { LOGGING_CONFIG } = require('@/lib/config/environment');

/**
 * Error types for categorization
 */
const ERROR_TYPES = {
    NETWORK: 'network',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    VALIDATION: 'validation',
    SERVER: 'server',
    UNKNOWN: 'unknown'
};

/**
 * HTTP status code mappings
 */
const HTTP_STATUS_MESSAGES = {
    400: 'Invalid request. Please check your input and try again.',
    401: 'Authentication failed. Please log in again.',
    403: 'You are not allowed to perform this action. Contact support.',
    404: 'The requested resource was not found.',
    409: 'This resource already exists. Please try a different option.',
    422: 'Invalid data provided. Please check your input.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Something went wrong on our server. Please try again later.',
    502: 'Service temporarily unavailable. Please try again later.',
    503: 'Service temporarily unavailable. Please try again later.',
    504: 'Request timeout. Please try again later.'
};

/**
 * Recursively flatten nested message objects
 * @param {any} message - The message to flatten
 * @returns {Array} Array of flattened messages
 */
const flattenMessages = (message) => {
    if (typeof message === 'string') {
        return [message];
    }

    if (Array.isArray(message)) {
        return message.flatMap(flattenMessages);
    }

    if (typeof message === 'object' && message !== null) {
        return Object.values(message).flatMap(flattenMessages);
    }

    return [];
};

/**
 * Format error for logging purposes
 * @param {Error} error - The error object
 * @param {Object} context - Additional context information
 * @returns {Object} Formatted error object
 */
const formatError = (error, context = {}) => {
    const baseError = {
        message: error.message || 'Unknown error',
        status: error.response?.status || error.status || 'No status',
        data: error.response?.data || error.data || 'No data',
        stack: error.stack || 'No stack trace',
        timestamp: new Date().toISOString(),
        type: getErrorType(error),
        ...context
    };

    // Add request information if available
    if (error.config) {
        baseError.url = error.config.url;
        baseError.method = error.config.method;
        baseError.headers = error.config.headers;
    }

    // Add response information if available
    if (error.response) {
        baseError.responseStatus = error.response.status;
        baseError.responseStatusText = error.response.statusText;
        baseError.responseHeaders = error.response.headers;
    }

    return baseError;
};

/**
 * Determine error type based on error properties
 * @param {Error} error - The error object
 * @returns {string} Error type
 */
const getErrorType = (error) => {
    // Check if this is a validation error thrown by our own code
    if (error.message && typeof error.message === 'string' &&
        (error.message.includes('required') ||
            error.message.includes('already been taken') ||
            error.message.includes('invalid') ||
            error.message.includes('must be'))) {
        return ERROR_TYPES.VALIDATION;
    }

    if (!error.response) {
        return ERROR_TYPES.NETWORK;
    }

    const status = error.response.status;

    if (status === 401) {
        return ERROR_TYPES.AUTHENTICATION;
    }

    if (status === 403) {
        return ERROR_TYPES.AUTHORIZATION;
    }

    if (status >= 400 && status < 500) {
        return ERROR_TYPES.VALIDATION;
    }

    if (status >= 500) {
        return ERROR_TYPES.SERVER;
    }

    return ERROR_TYPES.UNKNOWN;
};

/**
 * Convert technical errors to user-friendly messages
 * @param {Error} error - The error object
 * @param {Object} options - Options for error message generation
 * @returns {string} User-friendly error message
 */
const getUserFriendlyError = (error, options = {}) => {
    const {
        customMessages = {},
        includeTechnicalDetails = false,
        fallbackMessage = 'An unexpected error occurred. Please try again.'
    } = options;

    // Check for custom message first
    if (customMessages[error.message]) {
        return customMessages[error.message];
    }

    // Handle network errors (no response)
    if (!error.response) {
        return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    const status = error.response.status;
    const data = error.response.data;

    // Check for custom message in API response
    if (data?.message) {
        // Handle different message formats
        if (typeof data.message === 'string') {
            return data.message;
        }

        if (Array.isArray(data.message)) {
            return data.message.join(', ');
        }

        if (typeof data.message === 'object') {
            // Handle validation errors with field names - flatten nested structures
            const messages = flattenMessages(data.message);
            return messages.join(', ');
        }
    }

    // Use predefined HTTP status messages
    if (HTTP_STATUS_MESSAGES[status]) {
        return HTTP_STATUS_MESSAGES[status];
    }

    // Fallback to generic message
    return fallbackMessage;
};

/**
 * Log error with proper formatting and context
 * @param {string} context - Context where the error occurred
 * @param {Error} error - The error object
 * @param {Object} additionalContext - Additional context information
 */
const logError = (context, error, additionalContext = {}) => {
    const formattedError = formatError(error, {
        context,
        ...additionalContext
    });

    // Console logging in development
    if (LOGGING_CONFIG.ENABLE_CONSOLE) {
        try {
            console.error(`🚨 ${context}:`, formattedError);
        } catch (consoleError) {
            // Fallback logging if console.error fails
            console.log(`🚨 ${context}: Error logging failed - ${consoleError.message}`);
        }
    }

    // Remote logging in production
    if (LOGGING_CONFIG.ENABLE_REMOTE && LOGGING_CONFIG.REMOTE_ENDPOINT) {
        sendToRemoteLogging(context, formattedError);
    }
};

/**
 * Send error to remote logging service
 * @param {string} context - Error context
 * @param {Object} errorData - Formatted error data
 */
const sendToRemoteLogging = async (context, errorData) => {
    try {
        await fetch(LOGGING_CONFIG.REMOTE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: 'error',
                context,
                error: errorData,
                timestamp: new Date().toISOString(),
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
                url: typeof window !== 'undefined' ? window.location.href : 'unknown'
            }),
        });
    } catch (loggingError) {
        // Don't let logging errors break the app
        console.error('Failed to send error to remote logging:', loggingError);
    }
};

/**
 * Create a standardized error object
 * @param {string} message - Error message
 * @param {Object} options - Additional error options
 * @returns {Error} Standardized error object
 */
const createError = (message, options = {}) => {
    const error = new Error(message);

    // Add custom properties
    Object.assign(error, {
        isCustomError: true,
        timestamp: new Date().toISOString(),
        ...options
    });

    return error;
};

/**
 * Handle specific error cases with custom logic
 * @param {Error} error - The error object
 * @param {Function} handlers - Custom error handlers
 */
const handleSpecificErrors = (error, handlers = {}) => {
    const errorType = getErrorType(error);

    if (handlers[errorType]) {
        return handlers[errorType](error);
    }

    // Default handling
    switch (errorType) {
        case ERROR_TYPES.AUTHENTICATION:
            // Could trigger logout or redirect to login
            break;
        case ERROR_TYPES.AUTHORIZATION:
            // Could show access denied message
            break;
        case ERROR_TYPES.VALIDATION:
            // Could highlight form fields
            break;
        case ERROR_TYPES.SERVER:
            // Could show retry button
            break;
        default:
            // Generic error handling
            break;
    }
};

/**
 * Retry logic for failed requests
 * @param {Function} requestFn - Function to retry
 * @param {Object} options - Retry options
 * @returns {Promise} Promise that resolves with request result
 */
const withRetry = async (requestFn, options = {}) => {
    const {
        maxRetries = 3,
        delay = 1000,
        backoffMultiplier = 2,
        retryableErrors = [ERROR_TYPES.NETWORK, ERROR_TYPES.SERVER]
    } = options;

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            lastError = error;

            // Check if error is retryable
            if (attempt === maxRetries || !retryableErrors.includes(getErrorType(error))) {
                throw error;
            }

            // Calculate delay with exponential backoff
            const currentDelay = delay * Math.pow(backoffMultiplier, attempt);

            if (LOGGING_CONFIG.ENABLE_CONSOLE) {
                console.log(`🔄 Retrying request (${attempt + 1}/${maxRetries}) in ${currentDelay}ms`);
            }

            await new Promise(resolve => setTimeout(resolve, currentDelay));
        }
    }

    throw lastError;
};

/**
 * Error boundary helper for React components
 * @param {Error} error - The error object
 * @param {Object} errorInfo - React error info
 */
const handleReactError = (error, errorInfo) => {
    const formattedError = formatError(error, {
        context: 'React Component',
        errorInfo,
        componentStack: errorInfo.componentStack
    });

    logError('React Error Boundary', error, {
        errorInfo,
        componentStack: errorInfo.componentStack
    });

    // Could send to error tracking service here
    if (LOGGING_CONFIG.ENABLE_REMOTE) {
        sendToRemoteLogging('React Error Boundary', formattedError);
    }
};

module.exports = {
    formatError,
    getUserFriendlyError,
    logError,
    createError,
    handleSpecificErrors,
    withRetry,
    handleReactError,
    ERROR_TYPES,
    HTTP_STATUS_MESSAGES,
    getErrorType,
    flattenMessages
};
