'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      isRecovering: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for tracking
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error Boundary caught an error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: errorId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    }

    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo, tags: { errorId } });
    
    // Log to localStorage for debugging (limited to last 10 errors)
    this.logErrorToStorage(error, errorInfo, errorId);
  }

  logErrorToStorage = (error, errorInfo, errorId) => {
    try {
      const errorLog = {
        id: errorId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        },
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent
      };

      const existingLogs = JSON.parse(localStorage.getItem('trektoo_error_logs') || '[]');
      const updatedLogs = [errorLog, ...existingLogs].slice(0, 10); // Keep only last 10
      localStorage.setItem('trektoo_error_logs', JSON.stringify(updatedLogs));
    } catch (storageError) {
      console.warn('Could not log error to storage:', storageError);
    }
  };

  clearErrorLogs = () => {
    try {
      localStorage.removeItem('trektoo_error_logs');
      console.log('Error logs cleared successfully');
    } catch (error) {
      console.warn('Could not clear error logs:', error);
    }
  };

  handleRetry = async () => {
    this.setState({ isRecovering: true });
    
    try {
      // Clear error state
      this.setState({ 
        hasError: false, 
        error: null, 
        errorInfo: null,
        retryCount: this.state.retryCount + 1
      });
      
      // Force a re-render of children
      this.forceUpdate();
      
      // Small delay to ensure state is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (retryError) {
      console.error('Error during recovery:', retryError);
      this.setState({ 
        hasError: true, 
        error: retryError,
        isRecovering: false 
      });
    } finally {
      this.setState({ isRecovering: false });
    }
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleContactSupport = () => {
    const subject = encodeURIComponent(`Error Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
URL: ${window.location.href}
Error: ${this.state.error?.message || 'Unknown error'}
Time: ${new Date().toISOString()}

Please describe what you were doing when this error occurred:
    `);
    
    window.open(`mailto:support@trektoo.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
            {/* Enhanced Error Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Enhanced Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            </p>
            
            {/* Error ID for support */}
            {this.state.errorId && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Error ID:</span> {this.state.errorId}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Please include this ID when contacting support
                </p>
              </div>
            )}
            
            {/* Enhanced Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={this.handleRetry}
                disabled={this.state.isRecovering}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {this.state.isRecovering ? '🔄 Recovering...' : '🔄 Try Again'}
              </button>
              
              <button
                onClick={this.handleRefresh}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔄 Refresh Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200"
              >
                🏠 Go to Homepage
              </button>
            </div>

            {/* Enhanced Error Details Section */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    <span>🔍 View Error Details (Development)</span>
                    <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  
                  <div className="mt-4 space-y-4">
                    {/* Error Message */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <span>🚨 Error Message:</span>
                      </h3>
                      <div className="bg-white rounded border border-red-200 p-3">
                        <pre className="text-xs text-red-700 font-mono break-words whitespace-pre-wrap leading-relaxed">
                          {this.state.error.toString()}
                        </pre>
                      </div>
                    </div>
                    
                    {/* Stack Trace */}
                    {this.state.errorInfo && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <span>📚 Stack Trace:</span>
                        </h3>
                        <div className="bg-white rounded border border-gray-200 p-3 max-h-60 overflow-y-auto">
                          <pre className="text-xs text-gray-700 font-mono break-words whitespace-pre-wrap leading-relaxed">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      </div>
                    )}
                    
                    {/* Error Type */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <span>ℹ️ Error Type:</span>
                      </h3>
                      <div className="bg-white rounded border border-blue-200 p-3">
                        <code className="text-xs text-blue-700 font-mono">
                          {this.state.error.name || 'Unknown Error'}
                        </code>
                      </div>
                    </div>

                    {/* Retry Count */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        <span>🔄 Retry Count:</span>
                      </h3>
                      <div className="bg-white rounded border border-yellow-200 p-3">
                        <code className="text-xs text-yellow-700 font-mono">
                          {this.state.retryCount} attempts
                        </code>
                      </div>
                    </div>

                    {/* Clear Error Logs Button */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <span>🧹 Error Logs:</span>
                      </h3>
                      <button
                        onClick={this.clearErrorLogs}
                        className="px-4 py-2 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors"
                      >
                        Clear Error Logs
                      </button>
                    </div>
                  </div>
                </details>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Still having issues? Contact our support team:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <button
                  onClick={this.handleContactSupport}
                  className="text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-lg hover:bg-blue-50"
                >
                  📧 Email Support
                </button>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span className="text-blue-600">📞 +1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
