import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import Problem from "@/lib/models/Problem"
import mongoose from "mongoose"

export async function GET() {
  try {
    // Check if MONGODB_URI is available
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/coding-platform"
    if (!mongoUri) {
      return NextResponse.json({
        connected: false,
        message: "MONGODB_URI environment variable is not set",
        details: {
          error: "Missing environment variable",
          solution: "Create .env.local file with MONGODB_URI=mongodb://localhost:27017/coding-platform",
        },
      })
    }

    console.log("🔄 Attempting to connect to MongoDB...")
    console.log("📍 URI:", mongoUri.replace(/\/\/.*@/, "//***:***@"))

    // Try to connect to the database
    await connectDB()

    // Check if we're actually connected
    const connectionState = mongoose.connection.readyState
    const isConnected = connectionState === 1

    if (!isConnected) {
      return NextResponse.json({
        connected: false,
        message: `Database connection state: ${getConnectionStateMessage(connectionState)}`,
        details: {
          connectionState,
          uri: mongoUri.replace(/\/\/.*@/, "//***:***@"),
        },
      })
    }

    // Get database information
    const db = mongoose.connection.db
    let collections: string[] = []
    let userCount = 0
    let problemCount = 0

    try {
      if (db) {
        const collectionList = await db.listCollections().toArray()
        collections = collectionList.map((col) => col.name)
      } else {
        console.warn("Warning: mongoose.connection.db is undefined")
      }

      // Get counts safely
      userCount = await User.countDocuments().catch(() => 0)
      problemCount = await Problem.countDocuments().catch(() => 0)
    } catch (error) {
      console.warn("Warning: Could not fetch collection details:", error)
    }

    // Get connection details
    const host = mongoose.connection.host || "localhost"
    const databaseName = mongoose.connection.name || "unknown"

    return NextResponse.json({
      connected: true,
      message: "Successfully connected to MongoDB",
      details: {
        host,
        database: databaseName,
        collections,
        userCount,
        problemCount,
        connectionState: getConnectionStateMessage(connectionState),
      },
    })
  } catch (error: any) {
    console.error("❌ Database connection error:", error)

    let errorMessage = "Unknown database error"
    let solution = "Check your MongoDB setup"

    if (error.message) {
      errorMessage = error.message
    }

    // Check for common MongoDB connection errors
    if (error.message?.includes("ECONNREFUSED")) {
      errorMessage = "Connection refused - MongoDB server is not running"
      solution =
        "Start MongoDB: brew services start mongodb/brew/mongodb-community or docker run -d -p 27017:27017 mongo"
    } else if (error.message?.includes("authentication failed")) {
      errorMessage = "Authentication failed - check your credentials"
      solution = "Verify your username and password in the connection string"
    } else if (error.message?.includes("ENOTFOUND")) {
      errorMessage = "Host not found - check your connection string"
      solution = "Verify your MongoDB host address"
    } else if (error.message?.includes("serverSelectionTimeoutMS")) {
      errorMessage = "Server selection timeout - MongoDB server unreachable"
      solution = "Make sure MongoDB is running and accessible"
    }

    return NextResponse.json({
      connected: false,
      message: errorMessage,
      details: {
        error: error.message,
        solution,
        uri: process.env.MONGODB_URI?.replace(/\/\/.*@/, "//***:***@") || "Not set",
      },
    })
  }
}

function getConnectionStateMessage(state: number): string {
  switch (state) {
    case 0:
      return "Disconnected"
    case 1:
      return "Connected"
    case 2:
      return "Connecting"
    case 3:
      return "Disconnecting"
    default:
      return "Unknown"
  }
}
