import { EmailTemplate } from "@/components/email-template";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log(email, "email from singup");
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ email: email, password: hashedPassword });
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({
        email: email,
        linkUrl: `http://localhost:3000/verify?email=${email}`,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log(data, "data email");
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
