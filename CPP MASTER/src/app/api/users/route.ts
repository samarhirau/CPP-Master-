import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function GET() {
  try {
    await connectDB()

    const totalUsers = await User.countDocuments()
    const recentUsers = await User.find().select("username email createdAt role").sort({ createdAt: -1 }).limit(10)

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        recentUsers,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}
