import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { ids } = await req.json();
    console.log(ids, "ids from req");
    const result = await User.deleteMany({
      _id: { $in: ids },
      isVerified: false, // ONLY delete if the user is NOT verified
    });
    if (result.deletedCount > 0)
      return NextResponse.json({
        success: true,
        deletedCount: result.deletedCount,
        message: `${result.deletedCount} unverified users deleted.`,
      });
    throw new Error(
      "user hasn`t been deleted, you can't delete verified user with that button",
    );
  } catch (error) {
    // We catch the error thrown above OR any database errors
    if (error instanceof Error)
      return NextResponse.json(
        { success: false, message: error.message || "Something went wrong" },
        { status: 400 }, // Return 400 (Bad Request) or 500
      );
  }
}
