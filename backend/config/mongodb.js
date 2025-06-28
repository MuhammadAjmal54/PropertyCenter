

import mongoose from 'mongoose';

// MongoDB connection function
const connectDB = async () => {
  try {
    // MongoDB connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('Database Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Database connection error: ${err}`);
    });

    // Establishing the connection using the URI from environment variables
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Ensures the use of the new connection string parser
      useUnifiedTopology: true, // Uses the new unified topology for better connection management
    });

    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit the process with a non-zero exit code in case of a failure
  }
};

export default connectDB;
