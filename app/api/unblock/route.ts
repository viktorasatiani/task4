import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
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
    const { ids } = await req.json();
    const result = await User.updateMany(
      {
        _id: { $in: ids },
        isBlocked: { $eq: true }, // Only update if isBlocked is true
      },
      { $set: { isBlocked: false } },
    );

    // Return the response using NextResponse
    return NextResponse.json({
      success: result.modifiedCount > 0,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.log(error);
  }
}
