import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

export async function POST(request: NextRequest) {
  try {
    const { uri } = await request.json()

    if (!uri) {
      return NextResponse.json({
        success: false,
        error: "Connection URI is required",
      })
    }

    // Test the connection
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    })

    // Get database info
    const db = mongoose.connection.db
    if (!db) {
      await mongoose.disconnect()
      return NextResponse.json({
        success: false,
        error: "Database connection failed: db is undefined",
      })
    }
    const collections = await db.listCollections().toArray()

    const result = {
      success: true,
      message: "Connection successful!",
      details: {
        host: mongoose.connection.host,
        database: mongoose.connection.name,
        collections: collections.map((c) => c.name),
      },
    }

    await mongoose.disconnect()
    return NextResponse.json(result)
  } catch (error: any) {
    await mongoose.disconnect().catch(() => {})

    let errorMessage = "Connection failed"
    if (error.message?.includes("ECONNREFUSED")) {
      errorMessage = "Connection refused - MongoDB server may not be running"
    } else if (error.message?.includes("authentication failed")) {
      errorMessage = "Authentication failed - check your credentials"
    } else if (error.message?.includes("ENOTFOUND")) {
      errorMessage = "Host not found - check your connection string"
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
    })
  }
}
