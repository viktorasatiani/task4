"use client";
import {
  checkUserExistsApi,
  signUpApi,
  sendVerificationEmailApi,
} from "@/lib/auth-api";
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
  const router = useRouter();
  const showAuthToast = (
    message: string,
    type: "success" | "error" | "info",
    redirectToLogin: boolean = false,
  ) => {
    toast(message, {
      type: type,
      onClose: () => {
        if (redirectToLogin) {
          router.push("/login");
        }
      },
    });
  };

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
      const { user } = await checkUserExistsApi(data.email);

      if (user) {
        form.reset();
        showAuthToast("User Already Exists!", "error");
        return;
      }

      const res = await signUpApi({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });

      if (res.ok) {
        const emailResponse = await sendVerificationEmailApi(data.email);
        if (emailResponse.ok)
          showAuthToast(
            "User Has Been Registered Successfully!",
            "success",
            true,
          );
      } else {
        console.log("User registration failed.", res);
        showAuthToast("User Registration Failed!", "error");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      showAuthToast("Error During Registration!", "error");
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
