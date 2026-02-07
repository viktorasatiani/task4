import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
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
