/**
 * Environment Configuration Module
 * 
 * This module manages environment-specific configuration for the
 * College Event Management React Native app. It provides:
 * - API endpoint URLs for different environments
 * - WebSocket connection URLs for real-time features
 * - Environment detection and switching logic
 * - Development, staging, and production configurations
 * 
 * The configuration automatically switches based on the app's
 * build environment, ensuring the correct backend is used.
 */

import Constants from 'expo-constants';

/**
 * ENVIRONMENT CONFIGURATIONS
 * 
 * This object defines all environment-specific settings.
 * Each environment has its own configuration to ensure
 * proper separation between development, testing, and production.
 */
const ENV = {
  /**
   * DEVELOPMENT ENVIRONMENT
   * 
   * Used when running the app locally during development.
   * Points to local backend server for immediate testing.
   */
  development: {
    // Local backend API endpoint (port 4001 for development)
    apiUrl: 'http://localhost:4001/api',
    
    // Local WebSocket for real-time features (future implementation)
    websocketUrl: 'ws://localhost:4001',
    
    // Development-specific settings
    enableLogging: true,           // Enable detailed logging
    enableDebugMode: true,         // Enable debug features
    apiTimeout: 10000,             // 10 second timeout for development
    
    // Mock data settings (for offline development)
    useMockData: false,            // Set to true to use mock data
    
    // Development database identifier
    environment: 'development',
    
    // Additional development URLs
    healthCheckUrl: 'http://localhost:4001/health',
    
    // Future: Add development-specific feature flags
    // features: {
    //   enableBetaFeatures: true,
    //   enableTestingTools: true,
    // }
  },
  
  /**
   * STAGING ENVIRONMENT
   * 
   * Used for testing and quality assurance before production.
   * Points to staging server with production-like data.
   */
  staging: {
    // Staging backend API endpoint
    apiUrl: 'https://college-events-staging.render.com/api',
    
    // Staging WebSocket for real-time features
    websocketUrl: 'wss://college-events-staging.render.com',
    
    // Staging-specific settings
    enableLogging: true,           // Keep logging enabled for debugging
    enableDebugMode: false,        // Disable debug mode in staging
    apiTimeout: 15000,             // 15 second timeout for staging
    
    // Mock data disabled in staging
    useMockData: false,
    
    // Staging database identifier
    environment: 'staging',
    
    // Staging health check
    healthCheckUrl: 'https://college-events-staging.render.com/health',
    
    // Future: Add staging-specific configurations
    // analytics: {
    //   trackingId: 'staging-tracking-id',
    //   enableCrashReporting: true,
    // }
  },
  
  /**
   * PRODUCTION ENVIRONMENT
   * 
   * Used for the live app that end users interact with.
   * Points to production server with live data.
   */
  production: {
    // Production backend API endpoint
    apiUrl: 'https://college-events-api.render.com/api',
    
    // Production WebSocket for real-time features
    websocketUrl: 'wss://college-events-api.render.com',
    
    // Production-specific settings
    enableLogging: false,          // Disable detailed logging in production
    enableDebugMode: false,        // Disable debug mode in production
    apiTimeout: 20000,             // 20 second timeout for production
    
    // Mock data disabled in production
    useMockData: false,
    
    // Production database identifier
    environment: 'production',
    
    // Production health check
    healthCheckUrl: 'https://college-events-api.render.com/health',
    
    // Future: Add production-specific configurations
    // analytics: {
    //   trackingId: 'production-tracking-id',
    //   enableCrashReporting: true,
    //   enablePerformanceMonitoring: true,
    // },
    // security: {
    //   enableCertificatePinning: true,
    //   enableApiKeyRotation: true,
    // }
  },
};

/**
 * ENVIRONMENT DETECTION AND CONFIGURATION GETTER
 * 
 * This function determines the current environment and returns
 * the appropriate configuration object. It uses multiple methods
 * to detect the environment for maximum reliability.
 * 
 * @param {string} env - Optional environment override
 * @returns {object} Environment configuration object
 */
const getEnvVars = (env = Constants.releaseChannel) => {
  /**
   * DEVELOPMENT DETECTION
   * 
   * __DEV__ is a global variable set by React Native:
   * - true: When running in development mode (Metro bundler)
   * - false: When running in production builds
   * 
   * This is the most reliable way to detect development mode
   * as it's set by the React Native build system itself.
   */
  if (__DEV__) {
    console.log('🔧 Running in DEVELOPMENT mode');
    console.log('📡 API URL:', ENV.development.apiUrl);
    return ENV.development;
  }
  
  /**
   * STAGING DETECTION
   * 
   * Constants.releaseChannel is set by Expo when publishing:
   * - undefined: Development builds
   * - 'staging': Staging channel builds
   * - 'production': Production channel builds
   * 
   * This allows for proper environment detection in published builds.
   */
  else if (env === 'staging') {
    console.log('🧪 Running in STAGING mode');
    console.log('📡 API URL:', ENV.staging.apiUrl);
    return ENV.staging;
  }
  
  /**
   * PRODUCTION DETECTION
   * 
   * When the app is published to the production channel,
   * use production configuration with live backend services.
   */
  else if (env === 'production') {
    console.log('🚀 Running in PRODUCTION mode');
    // Don't log API URL in production for security
    return ENV.production;
  }
  
  /**
   * FALLBACK TO DEVELOPMENT
   * 
   * If environment detection fails, default to development
   * configuration to prevent connection issues during development.
   */
  else {
    console.log('⚠️  Environment detection failed, defaulting to DEVELOPMENT');
    console.log('📡 API URL:', ENV.development.apiUrl);
    return ENV.development;
  }
};

/**
 * ENVIRONMENT VALIDATION
 * 
 * This function validates that all required environment
 * variables are present and properly formatted.
 * 
 * @param {object} config - Environment configuration to validate
 * @returns {boolean} True if configuration is valid
 */
const validateEnvironment = (config) => {
  const requiredFields = ['apiUrl', 'websocketUrl', 'environment'];
  
  for (const field of requiredFields) {
    if (!config[field]) {
      console.error(`❌ Missing required environment field: ${field}`);
      return false;
    }
  }
  
  // Validate URL formats
  try {
    new URL(config.apiUrl);
    // Note: WebSocket URL validation would need different approach
  } catch (error) {
    console.error(`❌ Invalid API URL format: ${config.apiUrl}`);
    return false;
  }
  
  console.log('✅ Environment configuration validated successfully');
  return true;
};

/**
 * EXPORT CONFIGURATION GETTER
 * 
 * Export the main function that other parts of the app will use
 * to get environment-specific configuration.
 */
export default getEnvVars;

/**
 * EXPORT ADDITIONAL UTILITIES
 * 
 * Export additional functions that might be useful for
 * environment management throughout the app.
 */
export { validateEnvironment, ENV };

/**
 * USAGE EXAMPLES:
 * 
 * // Get current environment configuration
 * import getEnvVars from './config/environment';
 * const config = getEnvVars();
 * 
 * // Use API URL for HTTP requests
 * const response = await fetch(`${config.apiUrl}/events`);
 * 
 * // Check if in development mode
 * if (config.enableDebugMode) {
 *   console.log('Debug info:', debugData);
 * }
 * 
 * // Use WebSocket URL for real-time features
 * const socket = new WebSocket(config.websocketUrl);
 */