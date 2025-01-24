const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const connectDatabase = async () => {
  try {
    // Get MongoDB URL from environment variables
    const mongoURL = process.env.LOCAL_URL || 'mongodb://localhost:27017/elstar';

    // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected at ${mongoURL}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application if connection fails
  }
};

module.exports = {
  connectDatabase,
};
