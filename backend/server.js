/**
 * College Event Management System - Backend Server
 * 
 * This is the main Express.js server file that handles:
 * - API routing and middleware configuration
 * - Database connection management
 * - Security and rate limiting
 * - Error handling and graceful shutdown
 * 
 * The server is designed to support a React Native mobile app
 * for managing college events, club activities, and communications.
 */

// Import required dependencies
const express = require('express');        // Web framework for Node.js
const mongoose = require('mongoose');      // MongoDB object modeling library
const cors = require('cors');              // Cross-Origin Resource Sharing middleware
const helmet = require('helmet');          // Security middleware for HTTP headers
const rateLimit = require('express-rate-limit'); // Rate limiting middleware
require('dotenv').config();                // Load environment variables from .env file

// Initialize Express application
const app = express();

/**
 * SECURITY MIDDLEWARE CONFIGURATION
 * 
 * Helmet helps secure Express apps by setting various HTTP headers.
 * It's not a silver bullet, but it can help prevent some well-known
 * web vulnerabilities by setting HTTP headers appropriately.
 */
app.use(helmet());

/**
 * RATE LIMITING CONFIGURATION
 * 
 * Rate limiting helps protect against brute-force attacks and API abuse.
 * This configuration limits each IP address to a maximum number of requests
 * within a specified time window.
 */
const limiter = rateLimit({
  // Time window in milliseconds (default: 15 minutes)
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,

  // Maximum number of requests per window per IP (default: 100)
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // Error message sent when rate limit is exceeded
  message: 'Too many requests from this IP, please try again later.',

  // Additional options for production use:
  // - standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // - legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

/**
 * CORS (Cross-Origin Resource Sharing) CONFIGURATION
 * 
 * CORS is necessary because our React Native app (frontend) will be making
 * requests to this API server from a different origin. Without CORS,
 * browsers would block these requests for security reasons.
 */
app.use(cors({
  // Allow requests from our React Native app (Expo development server)
  origin: process.env.FRONTEND_URL || 'http://localhost:19006',

  // Allow credentials (cookies, authorization headers) to be sent
  credentials: true,

  // Additional CORS options that might be useful:
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
}));

/**
 * BODY PARSING MIDDLEWARE
 * 
 * These middleware functions parse incoming request bodies and make them
 * available under req.body property. The limit prevents DoS attacks
 * through large payloads.
 */

// Parse JSON payloads (for API requests with JSON data)
app.use(express.json({
  limit: '10mb',  // Limit JSON payload size to prevent memory exhaustion
  // Additional options:
  // strict: true,     // Only parse arrays and objects
  // type: 'application/json', // Only parse specific content types
}));

// Parse URL-encoded payloads (for form submissions)
app.use(express.urlencoded({
  extended: true,  // Use qs library for parsing (supports nested objects)
  limit: '10mb'    // Limit payload size
}));

/**
 * DATABASE CONNECTION FUNCTION
 * 
 * Establishes connection to MongoDB Atlas using Mongoose.
 * Uses async/await pattern for better error handling and readability.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection options for better reliability and performance
      useNewUrlParser: true,    // Use new URL parser (avoids deprecation warnings)
      useUnifiedTopology: true, // Use new topology engine (better connection management)

      // Additional options for production:
      // maxPoolSize: 10,        // Maximum number of connections in the pool
      // serverSelectionTimeoutMS: 5000, // How long to try selecting a server
      // socketTimeoutMS: 45000, // How long a send or receive on a socket can take
      // bufferMaxEntries: 0,    // Disable mongoose buffering
      // bufferCommands: false,  // Disable mongoose buffering
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Log additional connection info in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Database Name: ${conn.connection.name}`);
      console.log(`Connection State: ${conn.connection.readyState}`);
    }

  } catch (error) {
    // Log the error and exit the process if database connection fails
    console.error('Database connection error:', error.message);

    // In production, you might want to implement retry logic here
    // instead of immediately exiting the process
    process.exit(1);
  }
};

// Initiate database connection when server starts
// Note: Currently commented out for initial testing - will be enabled in next tasks
// connectDB();

/**
 * HEALTH CHECK ENDPOINT
 * 
 * This endpoint is used by monitoring services, load balancers,
 * and deployment systems to check if the server is running properly.
 * It provides basic server status information.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,

    // Additional health information that could be useful:
    // uptime: process.uptime(),
    // memory: process.memoryUsage(),
    // database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

/**
 * API ROOT ENDPOINT
 * 
 * Provides basic information about the API.
 * Useful for API discovery and documentation purposes.
 */
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'College Event Management API',
    version: '1.0.0',

    // Future: Add API documentation links, available endpoints, etc.
    // documentation: '/api/docs',
    // endpoints: {
    //   auth: '/api/auth',
    //   events: '/api/events',
    //   clubs: '/api/clubs',
    //   users: '/api/users'
    // }
  });
});

/**
 * ROOT ENDPOINT
 * 
 * Simple root endpoint to verify server is accessible.
 * Useful for basic connectivity testing.
 */
app.get('/', (req, res) => {
  res.json({
    success: true, // Fixed typo from original "succcess"
    message: "College Event Management API - Server is running",
    version: '1.0.0',
    timestamp: new Date().toISOString(),

    // Provide helpful links for API exploration
    endpoints: {
      health: '/health',
      api: '/api',
      // Future endpoints will be added here as they're implemented
    }
  });
});

/**
 * 404 NOT FOUND HANDLER
 * 
 * This middleware catches all requests that don't match any defined routes.
 * It must be placed after all other route definitions to work properly.
 * The '*' wildcard matches any route that hasn't been handled yet.
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
      // Additional debugging info in development
      ...(process.env.NODE_ENV === 'development' && {
        requestedUrl: req.originalUrl,
        method: req.method
      })
    }
  });
});

/**
 * GLOBAL ERROR HANDLER
 * 
 * This is Express's error-handling middleware. It must have 4 parameters
 * (err, req, res, next) to be recognized as an error handler.
 * It catches any errors that occur in route handlers or other middleware.
 */
app.use((err, req, res, next) => {
  // Log the error for debugging (in production, use a proper logging service)
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Send appropriate error response
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      // In production, don't expose internal error details to clients
      message: process.env.NODE_ENV === 'production'
        ? 'Something went wrong!'
        : err.message,

      // Additional error details for development
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack
      })
    }
  });
});

/**
 * SERVER STARTUP
 * 
 * Start the HTTP server on the specified port.
 * The port is configurable via environment variables for deployment flexibility.
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:19006'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

/**
 * GRACEFUL SHUTDOWN HANDLING
 * 
 * Handle SIGTERM signal (sent by process managers like PM2, Docker, etc.)
 * to gracefully shut down the server. This ensures:
 * - Existing connections are allowed to complete
 * - Database connections are properly closed
 * - Resources are cleaned up properly
 */
process.on('SIGTERM', () => {
  console.log('📡 SIGTERM received. Shutting down gracefully...');

  // Stop accepting new connections and close existing ones
  server.close(() => {
    console.log('🔌 HTTP server closed');

    // Close database connection
    mongoose.connection.close(() => {
      console.log('🗄️  Database connection closed');
      console.log('✅ Process terminated gracefully');
      process.exit(0);
    });
  });
});

/**
 * HANDLE UNCAUGHT EXCEPTIONS
 * 
 * This is a safety net for any uncaught exceptions.
 * In production, you should have proper error handling throughout your code.
 */
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

/**
 * HANDLE UNHANDLED PROMISE REJECTIONS
 * 
 * This catches any Promise rejections that weren't handled with .catch()
 */
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Export the Express app for testing purposes
module.exports = app;