import mongoose from 'mongoose';

// Flexible NOSQL Database,

// async returns a promise that resolves when the connection is successful
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR:${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;        