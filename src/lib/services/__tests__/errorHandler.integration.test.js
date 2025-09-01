/**
 * Integration Tests for Error Handling Service with API Integration
 */

const {
    logError,
    getUserFriendlyError,
    formatError,
    getErrorType,
    ERROR_TYPES
} = require('../errorHandler');

// Mock the secureApiClient to simulate API responses
jest.mock('@/lib/api/secureApiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
}));

// Mock the environment config
jest.mock('@/lib/config/environment', () => ({
    LOGGING_CONFIG: {
        ENABLE_CONSOLE: true,
        ENABLE_REMOTE: false,
        REMOTE_ENDPOINT: null
    }
}));

describe('Error Handling Service Integration Tests', () => {
    let mockConsole;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Mock console methods
        mockConsole = {
            error: jest.fn(),
            log: jest.fn(),
            warn: jest.fn()
        };
        console.error = mockConsole.error;
        console.log = mockConsole.log;
        console.warn = mockConsole.warn;
    });

    afterEach(() => {
        // Restore console
        console.error = console.error;
        console.log = console.log;
        console.warn = console.warn;
    });

    describe('API Error Scenarios', () => {
        it('should handle authentication errors correctly', () => {
            const authError = {
                message: 'Request failed with status code 401',
                response: {
                    status: 401,
                    statusText: 'Unauthorized',
                    data: {
                        message: 'Token expired'
                    }
                },
                config: {
                    url: '/api/auth/me',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer expired-token'
                    }
                }
            };

            // Test error type detection
            const errorType = getErrorType(authError);
            expect(errorType).toBe(ERROR_TYPES.AUTHENTICATION);

            // Test error formatting
            const formatted = formatError(authError, { context: 'User Profile API' });
            expect(formatted.type).toBe(ERROR_TYPES.AUTHENTICATION);
            expect(formatted.context).toBe('User Profile API');
            expect(formatted.url).toBe('/api/auth/me');
            expect(formatted.method).toBe('GET');

            // Test user-friendly message
            const userMessage = getUserFriendlyError(authError);
            expect(userMessage).toBe('Token expired');

            // Test logging
            logError('User Profile API', authError);
            expect(mockConsole.error).toHaveBeenCalledWith(
                '🚨 User Profile API:',
                expect.objectContaining({
                    type: ERROR_TYPES.AUTHENTICATION,
                    context: 'User Profile API'
                })
            );
        });

        it('should handle validation errors correctly', () => {
            const validationError = {
                message: 'Request failed with status code 422',
                response: {
                    status: 422,
                    statusText: 'Unprocessable Entity',
                    data: {
                        message: {
                            email: ['The email field is required'],
                            password: ['The password must be at least 8 characters'],
                            name: ['The name field is required']
                        }
                    }
                },
                config: {
                    url: '/api/auth/register',
                    method: 'POST'
                }
            };

            // Test error type detection
            const errorType = getErrorType(validationError);
            expect(errorType).toBe(ERROR_TYPES.VALIDATION);

            // Test error formatting
            const formatted = formatError(validationError, { context: 'User Registration API' });
            expect(formatted.type).toBe(ERROR_TYPES.VALIDATION);
            expect(formatted.responseStatus).toBe(422);

            // Test user-friendly message (should flatten object messages)
            const userMessage = getUserFriendlyError(validationError);
            expect(userMessage).toBe('The email field is required, The password must be at least 8 characters, The name field is required');

            // Test logging
            logError('User Registration API', validationError);
            expect(mockConsole.error).toHaveBeenCalled();
        });

        it('should handle server errors correctly', () => {
            const serverError = {
                message: 'Request failed with status code 500',
                response: {
                    status: 500,
                    statusText: 'Internal Server Error',
                    data: {
                        message: 'Database connection failed'
                    }
                },
                config: {
                    url: '/api/hotels/search',
                    method: 'GET'
                }
            };

            // Test error type detection
            const errorType = getErrorType(serverError);
            expect(errorType).toBe(ERROR_TYPES.SERVER);

            // Test error formatting
            const formatted = formatError(serverError, { context: 'Hotel Search API' });
            expect(formatted.type).toBe(ERROR_TYPES.SERVER);
            expect(formatted.responseStatus).toBe(500);

            // Test user-friendly message
            const userMessage = getUserFriendlyError(serverError);
            expect(userMessage).toBe('Database connection failed');

            // Test logging
            logError('Hotel Search API', serverError);
            expect(mockConsole.error).toHaveBeenCalled();
        });

        it('should handle network errors correctly', () => {
            const networkError = {
                message: 'Network Error',
                code: 'NETWORK_ERROR',
                config: {
                    url: '/api/hotels/search',
                    method: 'GET'
                }
            };

            // Test error type detection
            const errorType = getErrorType(networkError);
            expect(errorType).toBe(ERROR_TYPES.NETWORK);

            // Test error formatting
            const formatted = formatError(networkError, { context: 'Hotel Search API' });
            expect(formatted.type).toBe(ERROR_TYPES.NETWORK);
            expect(formatted.status).toBe('No status');

            // Test user-friendly message
            const userMessage = getUserFriendlyError(networkError);
            expect(userMessage).toContain('Unable to connect to the server');

            // Test logging
            logError('Hotel Search API', networkError);
            expect(mockConsole.error).toHaveBeenCalled();
        });

        it('should handle rate limiting errors correctly', () => {
            const rateLimitError = {
                message: 'Request failed with status code 429',
                response: {
                    status: 429,
                    statusText: 'Too Many Requests',
                    data: {
                        message: 'Rate limit exceeded. Try again in 60 seconds.'
                    }
                },
                config: {
                    url: '/api/hotels/search',
                    method: 'GET'
                }
            };

            // Test error type detection
            const errorType = getErrorType(rateLimitError);
            expect(errorType).toBe(ERROR_TYPES.VALIDATION);

            // Test error formatting
            const formatted = formatError(rateLimitError, { context: 'Hotel Search API' });
            expect(formatted.type).toBe(ERROR_TYPES.VALIDATION);
            expect(formatted.responseStatus).toBe(429);

            // Test user-friendly message
            const userMessage = getUserFriendlyError(rateLimitError);
            expect(userMessage).toBe('Rate limit exceeded. Try again in 60 seconds.');

            // Test logging
            logError('Hotel Search API', rateLimitError);
            expect(mockConsole.error).toHaveBeenCalled();
        });
    });

    describe('Error Context and Metadata', () => {
        it('should preserve request context in error formatting', () => {
            const apiError = {
                message: 'API Error',
                response: { status: 400 },
                config: {
                    url: '/api/test',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer token'
                    }
                }
            };

            const formatted = formatError(apiError, {
                context: 'Test API',
                userId: '123',
                requestId: 'req_123'
            });

            expect(formatted).toMatchObject({
                context: 'Test API',
                userId: '123',
                requestId: 'req_123',
                url: '/api/test',
                method: 'POST',
                headers: expect.any(Object)
            });
        });

        it('should handle errors with missing config gracefully', () => {
            const simpleError = new Error('Simple error');

            const formatted = formatError(simpleError, { context: 'Simple Test' });

            expect(formatted).toMatchObject({
                message: 'Simple error',
                context: 'Simple Test',
                type: ERROR_TYPES.NETWORK
            });

            // Should not have config-related properties
            expect(formatted.url).toBeUndefined();
            expect(formatted.method).toBeUndefined();
        });
    });

    describe('User-Friendly Message Generation', () => {
        it('should prioritize API response messages over predefined ones', () => {
            const error = {
                response: {
                    status: 400,
                    data: { message: 'Custom validation message' }
                }
            };

            const message = getUserFriendlyError(error);
            expect(message).toBe('Custom validation message');
        });

        it('should fall back to predefined messages when API response is empty', () => {
            const error = {
                response: {
                    status: 404,
                    data: {}
                }
            };

            const message = getUserFriendlyError(error);
            expect(message).toBe('The requested resource was not found.');
        });

        it('should handle complex nested message structures', () => {
            const error = {
                response: {
                    status: 400,
                    data: {
                        message: {
                            user: {
                                email: ['Invalid email format'],
                                profile: ['Profile data incomplete']
                            },
                            settings: ['Invalid settings configuration']
                        }
                    }
                }
            };

            const message = getUserFriendlyError(error);
            expect(message).toBe('Invalid email format, Profile data incomplete, Invalid settings configuration');
        });
    });

    describe('Error Logging Integration', () => {
        it('should log errors with complete context', () => {
            const error = {
                message: 'Test error',
                response: { status: 500 },
                config: { url: '/api/test' }
            };

            const additionalContext = {
                userId: '123',
                action: 'test',
                timestamp: '2024-01-01T00:00:00Z'
            };

            logError('Test Context', error, additionalContext);

            expect(mockConsole.error).toHaveBeenCalledWith(
                '🚨 Test Context:',
                expect.objectContaining({
                    message: 'Test error',
                    context: 'Test Context',
                    userId: '123',
                    action: 'test',
                    timestamp: '2024-01-01T00:00:00Z',
                    type: ERROR_TYPES.SERVER
                })
            );
        });

        it('should handle logging errors gracefully', () => {
            // Force console.error to throw
            console.error = jest.fn().mockImplementation(() => {
                throw new Error('Console error');
            });

            const error = new Error('Test error');

            // Should not throw
            expect(() => logError('Test Context', error)).not.toThrow();
        });
    });
});
