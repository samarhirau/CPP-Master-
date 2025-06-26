import connectDB from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { sendMail } from "@/helpers/sendmail";
import bcrypt from "bcryptjs";






export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

const salt = await bcrypt.genSaltSync(10);
const hashPassword =  await bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword
    });
    await newUser.save();

    await sendMail({email, emailType : "VERIFY" , userId : newUser._id});
    console.log(newUser);
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
      

    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


