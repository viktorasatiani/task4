import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { ids } = await req.json();
    console.log(ids, "ids from req");

    // 1. Identify the logged-in user
    const session = await getServerSession(authOptions);
    // 1. Type Guard: Check if session or session.user exists
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Check the requester's status in the DB
    const currentUser = await User.findOne({ email: session.user.email });

    if (currentUser?.isBlocked) {
      return NextResponse.json(
        {
          message: "Your account is blocked. You cannot perform this action.",
          success: false,
        },
        { status: 403 },
      );
    }

    const result = await User.deleteMany({ _id: { $in: ids } });

    // Return the response using NextResponse
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
