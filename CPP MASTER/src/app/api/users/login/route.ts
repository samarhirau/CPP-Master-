import connectDB from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    const { email, password } = await req.json();
    // Check if user exists
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Check your credentials" },
        { status: 404 }
      );
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Check your credentials" },
        { status: 401 }
      );
    }

 // If the user is not verified, return an error
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Email not verified" },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token =  jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set the token in the response cookies
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );



      response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // Make it inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });


    console.log("User token: ", token);
    
    // Return user data without password

    const { password: _, ...userData } = user.toObject();
    return NextResponse.json(
      { message: "Login successful", user: userData },
      { status: 200 }
    );
  

  

   

   


    // Return user data without password
   
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


