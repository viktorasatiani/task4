import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await request.json();

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    ).select("_id");
    console.log("user from verify ", user);

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.SERVICE_ID!,
          template_id: process.env.TEMPLATE_ID!,
          user_id: process.env.USER_ID!,
          template_params: {
            from_email: "viktorasatiani77@gmail.com",
            company: "ACME",
            email: email,
          },
        }),
      },
    );

    if (response.ok) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
