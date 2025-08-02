/**
 * Database Configuration Module
 * 
 * This module handles MongoDB connection setup and management for the
 * College Event Management System. It provides:
 * - Connection establishment with proper error handling
 * - Connection event monitoring and logging
 * - Graceful shutdown procedures
 * - Production-ready connection options
 * 
 * The module uses Mongoose as the ODM (Object Document Mapper) to interact
 * with MongoDB Atlas, providing schema validation and query building.
 */

const mongoose = require('mongoose');

/**
 * DATABASE CONNECTION FUNCTION
 * 
 * Establishes a connection to MongoDB Atlas using environment variables.
 * This function implements best practices for production deployments:
 * - Proper error handling and logging
 * - Connection event monitoring
 * - Configurable connection options
 * - Retry logic (can be extended)
 */
const connectDB = async () => {
  try {
    // Establish connection to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // PARSER OPTIONS
      useNewUrlParser: true,    // Use the new URL parser (avoids deprecation warnings)
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      
      // CONNECTION POOL OPTIONS (for production optimization)
      maxPoolSize: 10,          // Maximum number of connections in the connection pool
      minPoolSize: 2,           // Minimum number of connections in the connection pool
      maxIdleTimeMS: 30000,     // Close connections after 30 seconds of inactivity
      
      // TIMEOUT OPTIONS
      serverSelectionTimeoutMS: 5000,  // How long to try selecting a server
      socketTimeoutMS: 45000,          // How long a send or receive on a socket can take
      connectTimeoutMS: 10000,         // How long to wait for a connection to be established
      
      // BUFFERING OPTIONS
      bufferMaxEntries: 0,      // Disable mongoose buffering when not connected
      bufferCommands: false,    // Disable mongoose buffering
      
      // ADDITIONAL OPTIONS
      heartbeatFrequencyMS: 10000,     // How often to check the connection (10 seconds)
      retryWrites: true,               // Enable retryable writes
      w: 'majority',                   // Write concern - wait for majority of replica set
    });

    // Log successful connection with details
    console.log(`🗄️  MongoDB Connected Successfully!`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`🏷️  Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${getConnectionState(conn.connection.readyState)}`);
    
    // Log additional connection info in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔧 Connection Options:`, {
        maxPoolSize: 10,
        serverSelectionTimeout: '5s',
        socketTimeout: '45s',
        bufferCommands: false
      });
    }
    
    return conn;
    
  } catch (error) {
    // Enhanced error logging with context
    console.error('❌ Database Connection Failed!');
    console.error('🔍 Error Details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      timestamp: new Date().toISOString()
    });
    
    // In production, you might want to implement retry logic here
    // instead of immediately exiting the process
    if (process.env.NODE_ENV === 'production') {
      console.error('🔄 Consider implementing retry logic for production');
    }
    
    // Exit the process if database connection fails
    // This ensures the application doesn't run without database access
    process.exit(1);
  }
};

/**
 * CONNECTION EVENT LISTENERS
 * 
 * These event listeners provide real-time monitoring of the database
 * connection status. They're essential for debugging connection issues
 * and monitoring application health in production.
 */

// Successful connection event
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
  
  // Log additional info in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔗 Connection URI: ${process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@')}`);
  }
});

// Connection error event
mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', {
    message: err.message,
    code: err.code,
    timestamp: new Date().toISOString()
  });
  
  // In production, you might want to send alerts or notifications here
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement alerting system (email, Slack, etc.)
    console.error('🚨 Production database error - consider implementing alerts');
  }
});

// Disconnection event
mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
  
  // In production, you might want to attempt reconnection
  if (process.env.NODE_ENV === 'production') {
    console.log('🔄 Attempting to reconnect...');
    // Mongoose will automatically attempt to reconnect
  }
});

// Reconnection event
mongoose.connection.on('reconnected', () => {
  console.log('🔄 Mongoose reconnected to MongoDB');
});

// Connection close event
mongoose.connection.on('close', () => {
  console.log('🔒 Mongoose connection closed');
});

/**
 * UTILITY FUNCTION: Get Connection State Description
 * 
 * Converts Mongoose connection state numbers to human-readable strings
 * for better logging and debugging.
 */
const getConnectionState = (state) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
    99: 'Uninitialized'
  };
  return states[state] || 'Unknown';
};

/**
 * GRACEFUL SHUTDOWN HANDLING
 * 
 * Handle SIGINT signal (Ctrl+C) to gracefully close the database connection
 * before the application terminates. This ensures:
 * - All pending operations complete
 * - Connection pool is properly closed
 * - No data corruption occurs
 */
process.on('SIGINT', async () => {
  console.log('\n📡 SIGINT received. Closing MongoDB connection...');
  
  try {
    // Close the connection gracefully
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed through app termination');
    
    // Exit the process successfully
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message);
    
    // Force exit if graceful shutdown fails
    process.exit(1);
  }
});

/**
 * ADDITIONAL SHUTDOWN SIGNALS
 * 
 * Handle other termination signals for comprehensive shutdown handling
 */
process.on('SIGTERM', async () => {
  console.log('📡 SIGTERM received. Closing MongoDB connection...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed through SIGTERM');
  process.exit(0);
});

// Export the connection function for use in the main server file
module.exports = connectDB;