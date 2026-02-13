// src/components/ErrorBoundary.jsx
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Track error in analytics
    trackEvent('error_boundary_triggered', 'Error', `${error.name}: ${error.message}`);
    
    // Store error details in state
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRefresh = () => {
    trackEvent('error_boundary_refresh', 'Error', 'User clicked refresh after error');
    window.location.reload();
  };

  handleGoHome = () => {
    trackEvent('error_boundary_home', 'Error', 'User clicked go home after error');
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <AlertTriangle 
                size={64} 
                className="mx-auto text-red-500 mb-4" 
              />
              <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>
              <p className="text-text-light dark:text-text-dark">
                Don't worry, it's not you - it's us. Let's get you back on track.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRefresh}
                className="w-full flex items-center justify-center gap-2 bg-primary-light text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
              >
                <RefreshCw size={20} />
                Refresh Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <Home size={20} />
                Go to Homepage
              </button>
            </div>
            
            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-red-500 hover:text-red-400">
                  Show Error Details (Development Only)
                </summary>
                <div className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <pre className="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
