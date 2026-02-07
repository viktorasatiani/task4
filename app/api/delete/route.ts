import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { ids } = await req.json();
    console.log(ids, "ids from req");
    const result = await User.deleteMany({ _id: { $in: ids } });

    // Return the response using NextResponse
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
