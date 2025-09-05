import axios from 'axios';
import { API_CONFIG, SECURITY_CONFIG, LOGGING_CONFIG } from '@/lib/config/environment';
import { logError, getUserFriendlyError, ERROR_TYPES, getErrorType } from '@/lib/services/errorHandler';

/**
 * Secure API Client with enhanced security and error handling
 */
class SecureApiClient {
    constructor() {
        this.requestCount = 0;
        this.lastRequestTime = 0;
        this.rateLimitWindow = API_CONFIG.RATE_LIMIT.WINDOW_MS;


        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Client-Version': process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
                'X-Request-ID': this.generateRequestId(),
            },
        });

        this.setupInterceptors();
    }

    /**
     * Generate unique request ID for tracking
     */
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Setup request and response interceptors
     */
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Rate limiting check
                if (this.isRateLimited()) {
                    throw new Error('Rate limit exceeded. Please try again later.');
                }

                // Add authentication token if available
                const token = this.getAuthToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Add request timestamp
                config.metadata = { startTime: Date.now() };

                // Log request in development
                if (LOGGING_CONFIG.ENABLE_CONSOLE) {
                    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                        headers: this.maskSensitiveData(config.headers),
                        data: this.maskSensitiveData(config.data),
                    });
                }


                return config;
            },
            (error) => {
                this.logError('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => {
                // Calculate response time
                const responseTime = Date.now() - response.config.metadata.startTime;

                // Log successful response in development
                if (LOGGING_CONFIG.ENABLE_CONSOLE) {
                    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                        status: response.status,
                        responseTime: `${responseTime}ms`,
                        data: this.maskSensitiveData(response.data),
                    });
                }

                // Update rate limiting
                this.updateRateLimit();

                return response;
            },
            (error) => {
                // Calculate response time
                const responseTime = error.config?.metadata?.startTime
                    ? Date.now() - error.config.metadata.startTime
                    : 'unknown';


                // Enhanced error handling
                const enhancedError = this.enhanceError(error, responseTime);

                // Log error
                this.logError('API Response Error:', enhancedError);

                // Handle specific error cases
                this.handleSpecificErrors(enhancedError);

                return Promise.reject(enhancedError);
            }
        );
    }

    /**
     * Check if request is rate limited
     */
    isRateLimited() {
        const now = Date.now();

        // Reset counter if window has passed
        if (now - this.lastRequestTime > this.rateLimitWindow) {
            this.requestCount = 0;
            this.lastRequestTime = now;
        }

        // Check if limit exceeded
        if (this.requestCount >= API_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
            return true;
        }

        return false;
    }

    /**
     * Update rate limiting counter
     */
    updateRateLimit() {
        this.requestCount++;
    }

    /**
     * Get authentication token from secure storage
     */
    getAuthToken() {
        try {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('authToken');
            }
            return null;
        } catch (error) {
            this.logError('Error getting auth token:', error);
            return null;
        }
    }

    /**
     * Mask sensitive data in logs
     */
    maskSensitiveData(data) {
        if (!data || typeof data !== 'object') return data;

        const masked = { ...data };
        LOGGING_CONFIG.MASK_FIELDS.forEach(field => {
            if (masked[field]) {
                masked[field] = '***MASKED***';
            }
        });

        return masked;
    }

    /**
     * Enhance error with additional context
     */
    enhanceError(error, responseTime) {
        const enhanced = {
            ...error,
            responseTime,
            timestamp: new Date().toISOString(),
            requestId: error.config?.headers?.['X-Request-ID'],
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
        };

        // Add user-friendly message
        enhanced.userMessage = this.getUserFriendlyMessage(enhanced);

        // Add retry information
        enhanced.retryable = this.isRetryable(enhanced);
        enhanced.maxRetries = API_CONFIG.MAX_RETRIES;

        return enhanced;
    }

    /**
     * Get user-friendly error message
     */
    getUserFriendlyMessage(error) {
        return getUserFriendlyError(error);
    }

    /**
     * Check if error is retryable
     */
    isRetryable(error) {
        const errorType = getErrorType(error);
        return [ERROR_TYPES.NETWORK, ERROR_TYPES.SERVER].includes(errorType);
    }

    /**
     * Handle specific error cases
     */
    handleSpecificErrors(error) {
        // Handle authentication errors
        if (error.response?.status === 401) {
            this.handleAuthError();
        }

        // Handle rate limiting
        if (error.response?.status === 429) {
            this.handleRateLimitError();
        }
    }

    /**
     * Handle authentication errors
     */
    handleAuthError() {
        try {
            // Clear invalid tokens
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            }

            // Redirect to login if not already there
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        } catch (error) {
            this.logError('Error handling auth error:', error);
        }
    }

    /**
     * Handle rate limit errors
     */
    handleRateLimitError() {
        // Could implement exponential backoff here
        console.warn('Rate limit exceeded. Consider implementing exponential backoff.');
    }

    /**
     * Log errors with proper formatting
     */
    logError(message, error) {
        logError(message, error);
    }



    /**
     * Make HTTP request with retry logic
     */
    async request(config, retryCount = 0) {
        try {
            return await this.client.request(config);
        } catch (error) {
            // Check if we should retry
            if (error.retryable && retryCount < API_CONFIG.MAX_RETRIES) {
                const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff

                if (LOGGING_CONFIG.ENABLE_CONSOLE) {
                    console.log(`🔄 Retrying request (${retryCount + 1}/${API_CONFIG.MAX_RETRIES}) in ${delay}ms`);
                }

                await new Promise(resolve => setTimeout(resolve, delay));
                return this.request(config, retryCount + 1);
            }

            throw error;
        }
    }

    // Convenience methods
    async get(url, config = {}) {
        return this.request({ ...config, method: 'GET', url });
    }

    async post(url, data, config = {}) {
        return this.request({ ...config, method: 'POST', url, data });
    }

    async put(url, data, config = {}) {
        return this.request({ ...config, method: 'PUT', url, data });
    }

    async delete(url, config = {}) {
        return this.request({ ...config, method: 'DELETE', url });
    }

    async patch(url, data, config = {}) {
        return this.request({ ...config, method: 'PATCH', url, data });
    }
}

// Create singleton instance
const secureApiClient = new SecureApiClient();

export default secureApiClient;
