import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cachedConnection: typeof mongoose | null = null;

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect("mongodb+srv://gesti:gesti123@gestiapp.xdcwi8c.mongodb.net/?retryWrites=true&w=majority", {
      bufferCommands: false, // Disable buffering
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; 
  }

  return cachedConnection;
};
