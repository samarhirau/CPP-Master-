import { NextRequest , NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user";
import connectDB from "@/dbConfig/db";



export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get the token from cookies
    const token:any = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }
    
    // Get user data from token
    const userData = getDataFromToken(token);

    if (!userData) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Find user by ID
    const user = await User.findById(userData.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}