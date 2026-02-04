"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";

const LogInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is required"),
});

export default function LogInForm() {
  const notify = () => toast("Logged in successfully!");

  const router = useRouter();
  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LogInFormSchema>) {
    // Do something with the form values.

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        notify();
        router.push("/");
      } else {
        toast("Invalid email or password, ether user is blocked!");
      }
    } catch (error) {
      console.log("Error during login: ", error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md"
    >
      <ToastContainer />
      <h1 className="text-xl font-semibold">Login</h1>
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
        Log In
      </Button>
    </form>
  );
}
