import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import jwt from "jsonwebtoken";



export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Find user by ID
    let userId: string | undefined;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      userId = (decoded as { id?: string }).id;
    }
    
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Clear the JWT token from cookies
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: -1 // Set maxAge to -1 to delete the cookie
     });
     return response;
     }
     catch (error) {
           console.error("Error during logout:", error);
           return NextResponse.json(
           { message: "Internal server error" },
           { status: 500 }
           );
      }
}
