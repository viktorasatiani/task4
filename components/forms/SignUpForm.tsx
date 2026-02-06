"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";

const SignUpFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is required"),
  fullName: z.string().min(1, "full name is required"),
});

export default function SignUpForm() {
  const registered = () =>
    toast("User Has Been Registered Successfully!", {
      onClose: () => {
        router.push("/login");
      },
    });
  const alreadyExists = () => toast("User Already Exists!");
  const failedRegistration = () => toast("User Registration Failed!");
  const errorRegistering = () => toast("Error During Registration!");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    // Do something with the form values.

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        form.reset();
        alreadyExists();
        return;
      }

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        }),
      });

      if (res.ok) {
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
                email: data.email,
              },
            }),
          },
        );
        if (response.ok) registered();
      } else {
        console.log("User registration failed.", res);
        failedRegistration();
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      errorRegistering();
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md"
    >
      <ToastContainer />
      <h1 className="text-xl font-semibold">Signup</h1>
      <div className="flex w-full flex-col gap-2">
        <Label>Email</Label>
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Email"
          className="text-sm"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>Full Name</Label>
        <Input
          {...form.register("fullName")}
          type="text"
          placeholder="Full Name"
          className="text-sm"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>Password</Label>
        <Input
          {...form.register("password")}
          type="password"
          placeholder="Password"
          className="text-sm"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
}
