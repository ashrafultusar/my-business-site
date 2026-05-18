import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

// Use a cached connection to avoid multiple connections in development
const globalWithMongoose = global as typeof globalThis & {
    mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            dbName: "my-app",
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
