# Error Handling Service Tests

This directory contains comprehensive tests for the centralized error handling service.

## Test Files

- **`errorHandler.test.js`** - Unit tests for all error handling functions
- **`errorHandler.integration.test.js`** - Integration tests for API error scenarios

## Running Tests

### Prerequisites

Install the testing dependencies:

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests for CI

```bash
npm run test:ci
```

## Test Coverage

The tests cover:

### Unit Tests
- ✅ Error type detection (`getErrorType`)
- ✅ Error formatting (`formatError`)
- ✅ User-friendly message generation (`getUserFriendlyError`)
- ✅ Error logging (`logError`)
- ✅ Custom error creation (`createError`)
- ✅ Specific error handling (`handleSpecificErrors`)
- ✅ Retry logic (`withRetry`)
- ✅ React error handling (`handleReactError`)

### Integration Tests
- ✅ Authentication errors (401)
- ✅ Validation errors (422)
- ✅ Server errors (500)
- ✅ Network errors
- ✅ Rate limiting errors (429)
- ✅ Error context preservation
- ✅ Complex message structures
- ✅ Logging integration

## Test Scenarios

### Error Types
- **NETWORK**: Connection issues, timeouts
- **AUTHENTICATION**: 401 errors, invalid tokens
- **AUTHORIZATION**: 403 errors, insufficient permissions
- **VALIDATION**: 4xx errors (except 401/403)
- **SERVER**: 5xx errors, server issues
- **UNKNOWN**: Unclassified errors

### HTTP Status Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 429: Too Many Requests
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable
- 504: Gateway Timeout

## Mocking

The tests use Jest mocks for:
- Console methods (error, log, warn)
- Fetch API
- Environment configuration
- API client methods

## Example Test Output

```
 PASS  src/lib/services/__tests__/errorHandler.test.js
 PASS  src/lib/services/__tests__/errorHandler.integration.test.js

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        2.145 s
Ran all test suites.

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

## Debugging Tests

### Run Single Test File

```bash
npm test -- errorHandler.test.js
```

### Run Specific Test

```bash
npm test -- --testNamePattern="should handle authentication errors correctly"
```

### Verbose Output

```bash
npm test -- --verbose
```

### Debug Mode

```bash
npm test -- --detectOpenHandles --forceExit
```

## Adding New Tests

When adding new functionality to the error handling service:

1. **Add unit tests** to `errorHandler.test.js`
2. **Add integration tests** to `errorHandler.integration.test.js`
3. **Update test coverage** expectations
4. **Run tests** to ensure they pass
5. **Update this README** if needed

## Test Best Practices

- Each test should test one specific behavior
- Use descriptive test names that explain the expected behavior
- Mock external dependencies appropriately
- Test both success and failure scenarios
- Test edge cases and error conditions
- Keep tests fast and isolated
- Use setup and teardown functions when needed

