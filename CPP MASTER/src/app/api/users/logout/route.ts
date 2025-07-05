import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import jwt from "jsonwebtoken";



export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get the token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

 

    // Clear the token cookie
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Clear the cookie
    });

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}