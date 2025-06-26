import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  } | undefined
}

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongooseConn

if (!cached) {
  global.mongooseConn = { conn: null, promise: null }
  cached = global.mongooseConn
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached!.promise = mongoose.connect(`${MONGODB_URI}/MONGODB_NAME`, opts)
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

export default connectDB
