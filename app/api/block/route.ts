import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { ids } = await req.json();
    console.log(ids, "ids from req");
    const result = await User.updateMany(
      {
        _id: { $in: ids },
        isBlocked: { $ne: true }, // Only update if isBlocked is NOT true
      },
      { $set: { isBlocked: true } },
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
