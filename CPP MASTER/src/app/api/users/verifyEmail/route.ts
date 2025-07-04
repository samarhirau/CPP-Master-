import connectDB from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

const requestBody = await req.json();
    const { token } = requestBody;

    if (!token) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
