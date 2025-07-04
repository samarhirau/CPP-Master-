import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export function getDataFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}