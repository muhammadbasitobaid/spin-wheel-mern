import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare const globalThis: {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  globalThis.mongoose = cached;
  return cached.conn;
}
