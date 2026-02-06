import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    ).select("_id");
    console.log("user from verify ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
