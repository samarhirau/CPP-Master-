import connectDB from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { sendMail } from "@/helpers/sendmail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


 
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
const salt = await bcrypt.genSaltSync(10);
const hashPassword =  await bcrypt.hashSync(password, salt);

const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
    // Create a new user
    const user = new User({
      name,
      email,
      password: hashPassword,
      verificationToken: token,
      verificationTokenExpiry: Date.now() +   60 * 60 * 1000 // 24 h expiry
    });

    await user.save();
console.log("User created successfully:", user);
     await sendMail({email, emailType : "VERIFY" , userId : user._id});


const response = NextResponse.json(
      { message: "User created successfully. Please verify your email." },
      { status: 201 }
    );

    
     // set token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}





 

