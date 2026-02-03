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
});

export default function SignUpForm() {
  const notify = () => toast("Wow so easy !");

  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
        notify();
        console.log("user exists");
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
        }),
      });

      if (res.ok) {
        form.reset();
        router.push("/dashboard");
      } else {
        console.log("User registration failed.", res);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
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
