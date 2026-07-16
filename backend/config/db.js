const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB Atlas database using Mongoose.
 * This helper function makes it easy to initialize and manage database states.
 */
const connectDB = async () => {
  try {
    // Read the MONGODB_URl connection string from environment variables
    const dbURI = process.env.MONGODB_URl || process.env.MONGODB_URL;

    if (!dbURI) {
      console.error('❌ MONGODB_URl is not defined in the environment variables!');
      console.error('Please configure MONGODB_URl in your .env file or hosting provider (Render).');
      process.exit(1);
    }

    // Connect using standard Mongoose settings with the database name set to 'registration_sheet'
    const conn = await mongoose.connect(dbURI, {
      dbName: 'registration_sheet'
    });

    console.log(`📡 MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure code if connection fails on startup
    process.exit(1);
  }
};

module.exports = connectDB;
