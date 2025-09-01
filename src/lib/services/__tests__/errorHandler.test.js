/**
 * Tests for Centralized Error Handling Service
 */

const {
    ERROR_TYPES,
    HTTP_STATUS_MESSAGES,
    formatError,
    getErrorType,
    getUserFriendlyError,
    logError,
    createError,
    handleSpecificErrors,
    withRetry,
    handleReactError
} = require('../errorHandler');

// Mock console methods
const originalConsole = { ...console };
const mockConsole = {
    error: jest.fn(),
    log: jest.fn(),
    warn: jest.fn()
};

// Mock fetch
global.fetch = jest.fn();

// Mock environment config
jest.mock('@/lib/config/environment', () => ({
    LOGGING_CONFIG: {
        ENABLE_CONSOLE: true,
        ENABLE_REMOTE: false,
        REMOTE_ENDPOINT: null
    }
}));

describe('Centralized Error Handling Service', () => {
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
        console.error = mockConsole.error;
        console.log = mockConsole.log;
        console.warn = mockConsole.warn;
    });

    afterAll(() => {
        // Restore original console
        console.error = originalConsole.error;
        console.log = originalConsole.log;
        console.warn = originalConsole.warn;
    });

    describe('ERROR_TYPES', () => {
        it('should have all required error types', () => {
            expect(ERROR_TYPES).toEqual({
                NETWORK: 'network',
                AUTHENTICATION: 'authentication',
                AUTHORIZATION: 'authorization',
                VALIDATION: 'validation',
                SERVER: 'server',
                UNKNOWN: 'unknown'
            });
        });
    });

    describe('HTTP_STATUS_MESSAGES', () => {
        it('should have all required HTTP status messages', () => {
            expect(HTTP_STATUS_MESSAGES).toEqual({
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
            });
        });
    });

    describe('getErrorType', () => {
        it('should return NETWORK for errors without response', () => {
            const error = new Error('Network error');
            expect(getErrorType(error)).toBe(ERROR_TYPES.NETWORK);
        });

        it('should return AUTHENTICATION for 401 errors', () => {
            const error = {
                response: { status: 401 }
            };
            expect(getErrorType(error)).toBe(ERROR_TYPES.AUTHENTICATION);
        });

        it('should return AUTHORIZATION for 403 errors', () => {
            const error = {
                response: { status: 403 }
            };
            expect(getErrorType(error)).toBe(ERROR_TYPES.AUTHORIZATION);
        });

        it('should return VALIDATION for 4xx errors (except 401/403)', () => {
            const error = {
                response: { status: 400 }
            };
            expect(getErrorType(error)).toBe(ERROR_TYPES.VALIDATION);
        });

        it('should return SERVER for 5xx errors', () => {
            const error = {
                response: { status: 500 }
            };
            expect(getErrorType(error)).toBe(ERROR_TYPES.SERVER);
        });

        it('should return UNKNOWN for other status codes', () => {
            const error = {
                response: { status: 200 }
            };
            expect(getErrorType(error)).toBe(ERROR_TYPES.UNKNOWN);
        });
    });

    describe('formatError', () => {
        it('should format basic error correctly', () => {
            const error = new Error('Test error');
            const context = { endpoint: '/api/test' };

            const formatted = formatError(error, context);

            expect(formatted).toMatchObject({
                message: 'Test error',
                status: 'No status',
                data: 'No data',
                stack: expect.any(String),
                timestamp: expect.any(String),
                type: ERROR_TYPES.NETWORK,
                endpoint: '/api/test'
            });
        });

        it('should include response information when available', () => {
            const error = {
                message: 'API Error',
                response: {
                    status: 400,
                    statusText: 'Bad Request',
                    data: { message: 'Invalid input' }
                },
                config: {
                    url: '/api/test',
                    method: 'POST'
                }
            };

            const formatted = formatError(error);

            expect(formatted).toMatchObject({
                message: 'API Error',
                status: 400,
                responseStatus: 400,
                responseStatusText: 'Bad Request',
                url: '/api/test',
                method: 'POST',
                type: ERROR_TYPES.VALIDATION
            });
        });

        it('should handle errors with custom status', () => {
            const error = {
                message: 'Custom Error',
                status: 999
            };

            const formatted = formatError(error);

            expect(formatted.status).toBe(999);
        });
    });

    describe('getUserFriendlyError', () => {
        it('should return network error message for network errors', () => {
            const error = new Error('Network error');

            const message = getUserFriendlyError(error);

            expect(message).toBe('Unable to connect to the server. Please check your internet connection and try again.');
        });

        it('should return custom message from API response', () => {
            const error = {
                response: {
                    status: 400,
                    data: { message: 'Custom validation error' }
                }
            };

            const message = getUserFriendlyError(error);

            expect(message).toBe('Custom validation error');
        });

        it('should handle array messages from API response', () => {
            const error = {
                response: {
                    status: 400,
                    data: { message: ['Error 1', 'Error 2'] }
                }
            };

            const message = getUserFriendlyError(error);

            expect(message).toBe('Error 1, Error 2');
        });

        it('should handle object messages from API response', () => {
            const error = {
                response: {
                    status: 400,
                    data: {
                        message: {
                            email: ['Invalid email'],
                            password: ['Too short']
                        }
                    }
                }
            };

            const message = getUserFriendlyError(error);

            expect(message).toBe('Invalid email, Too short');
        });

        it('should use predefined HTTP status messages', () => {
            const error = {
                response: { status: 404 }
            };

            const message = getUserFriendlyError(error);

            expect(message).toBe(HTTP_STATUS_MESSAGES[404]);
        });

        it('should use custom messages when provided', () => {
            const error = new Error('Custom error');
            const customMessages = {
                'Custom error': 'This is a custom message'
            };

            const message = getUserFriendlyError(error, { customMessages });

            expect(message).toBe('This is a custom message');
        });

        it('should use fallback message when no other message is available', () => {
            const error = {
                response: { status: 999 }
            };

            const message = getUserFriendlyError(error, {
                fallbackMessage: 'Custom fallback message'
            });

            expect(message).toBe('Custom fallback message');
        });
    });

    describe('logError', () => {
        it('should log error to console in development', () => {
            const error = new Error('Test error');

            logError('Test Context', error);

            expect(mockConsole.error).toHaveBeenCalledWith(
                '🚨 Test Context:',
                expect.objectContaining({
                    message: 'Test error',
                    context: 'Test Context'
                })
            );
        });

        it('should include additional context in logged error', () => {
            const error = new Error('Test error');
            const additionalContext = { userId: '123', action: 'test' };

            logError('Test Context', error, additionalContext);

            expect(mockConsole.error).toHaveBeenCalledWith(
                '🚨 Test Context:',
                expect.objectContaining({
                    userId: '123',
                    action: 'test'
                })
            );
        });
    });

    describe('createError', () => {
        it('should create error with custom properties', () => {
            const message = 'Custom error message';
            const options = { code: 'CUSTOM_001', severity: 'high' };

            const error = createError(message, options);

            expect(error.message).toBe(message);
            expect(error.isCustomError).toBe(true);
            expect(error.timestamp).toBeDefined();
            expect(error.code).toBe('CUSTOM_001');
            expect(error.severity).toBe('high');
        });

        it('should create error with default options', () => {
            const message = 'Default error';

            const error = createError(message);

            expect(error.message).toBe(message);
            expect(error.isCustomError).toBe(true);
            expect(error.timestamp).toBeDefined();
        });
    });

    describe('handleSpecificErrors', () => {
        it('should call custom handler for specific error type', () => {
            const error = {
                response: { status: 401 }
            };

            const handlers = {
                [ERROR_TYPES.AUTHENTICATION]: jest.fn()
            };

            handleSpecificErrors(error, handlers);

            expect(handlers[ERROR_TYPES.AUTHENTICATION]).toHaveBeenCalledWith(error);
        });

        it('should handle errors without custom handlers', () => {
            const error = {
                response: { status: 500 }
            };

            // Should not throw error
            expect(() => handleSpecificErrors(error)).not.toThrow();
        });
    });

    describe('withRetry', () => {
        it('should return result on successful request', async () => {
            const requestFn = jest.fn().mockResolvedValue('success');

            const result = await withRetry(requestFn);

            expect(result).toBe('success');
            expect(requestFn).toHaveBeenCalledTimes(1);
        });

        it('should retry on retryable errors', async () => {
            const requestFn = jest.fn()
                .mockRejectedValueOnce({ response: { status: 500 } }) // First call fails
                .mockResolvedValueOnce('success'); // Second call succeeds

            const result = await withRetry(requestFn, { maxRetries: 2 });

            expect(result).toBe('success');
            expect(requestFn).toHaveBeenCalledTimes(2);
        });

        it('should not retry on non-retryable errors', async () => {
            const requestFn = jest.fn().mockRejectedValue({
                response: { status: 400 } // Validation error - not retryable
            });

            await expect(withRetry(requestFn)).rejects.toMatchObject({
                response: { status: 400 }
            });

            expect(requestFn).toHaveBeenCalledTimes(1);
        });

        it('should respect max retries limit', async () => {
            const requestFn = jest.fn().mockRejectedValue({
                response: { status: 500 }
            });

            await expect(withRetry(requestFn, { maxRetries: 2 })).rejects.toMatchObject({
                response: { status: 500 }
            });

            expect(requestFn).toHaveBeenCalledTimes(3); // Initial + 2 retries
        });

        it('should use exponential backoff', async () => {
            const requestFn = jest.fn()
                .mockRejectedValueOnce({ response: { status: 500 } })
                .mockResolvedValueOnce('success');

            const startTime = Date.now();
            const result = await withRetry(requestFn, { delay: 50, backoffMultiplier: 2, maxRetries: 1 });
            const endTime = Date.now();

            expect(result).toBe('success');
            expect(requestFn).toHaveBeenCalledTimes(2);

            // Verify that some delay occurred (at least 40ms)
            expect(endTime - startTime).toBeGreaterThanOrEqual(40);
        });
    });

    describe('handleReactError', () => {
        it('should handle React component errors', () => {
            const error = new Error('React error');
            const errorInfo = {
                componentStack: 'Component stack trace'
            };

            // Should not throw
            expect(() => handleReactError(error, errorInfo)).not.toThrow();

            // Should log error
            expect(mockConsole.error).toHaveBeenCalled();
        });
    });

    describe('Integration Tests', () => {
        it('should handle complete error flow', () => {
            const error = {
                message: 'API Error',
                response: {
                    status: 422,
                    data: { message: 'Validation failed' }
                },
                config: {
                    url: '/api/users',
                    method: 'POST'
                }
            };

            // Test error type detection
            const errorType = getErrorType(error);
            expect(errorType).toBe(ERROR_TYPES.VALIDATION);

            // Test error formatting
            const formatted = formatError(error, { context: 'User Creation' });
            expect(formatted.type).toBe(ERROR_TYPES.VALIDATION);
            expect(formatted.context).toBe('User Creation');

            // Test user-friendly message
            const userMessage = getUserFriendlyError(error);
            expect(userMessage).toBe('Validation failed');

            // Test logging
            logError('User Creation', error);
            expect(mockConsole.error).toHaveBeenCalled();
        });

        it('should handle network errors gracefully', () => {
            const networkError = new Error('Network timeout');

            const errorType = getErrorType(networkError);
            expect(errorType).toBe(ERROR_TYPES.NETWORK);

            const userMessage = getUserFriendlyError(networkError);
            expect(userMessage).toContain('Unable to connect to the server');

            const formatted = formatError(networkError);
            expect(formatted.type).toBe(ERROR_TYPES.NETWORK);
        });

        it('should handle authentication errors correctly', () => {
            const authError = {
                response: { status: 401 }
            };

            const errorType = getErrorType(authError);
            expect(errorType).toBe(ERROR_TYPES.AUTHENTICATION);

            const userMessage = getUserFriendlyError(authError);
            expect(userMessage).toContain('Authentication failed');
        });
    });
});
