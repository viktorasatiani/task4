import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const users = await User.find({}, { password: 0 });
    console.log(users, "users from api");
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message: `An error occurred while fetching the users: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
