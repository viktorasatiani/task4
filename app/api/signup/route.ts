import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, fullName } = await req.json();
    console.log(email, "email from singup");
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        message: `An error occurred while registering the user: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
