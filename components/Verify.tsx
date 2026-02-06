"use client";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Verify = ({ email }: { email: string }) => {
  const router = useRouter();
  const verifiedEmail = () =>
    toast("Email Verified Successfully!", {
      onClose: () => {
        router.push("/login");
      },
    });

  async function handleAcceptInvite() {
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        verifiedEmail();
      }
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return (
    <section className="py-32">
      <ToastContainer />
      <div className="container">
        <div className="mx-auto w-fit space-y-12 rounded-xl border px-6 pt-12 pb-10 shadow-lg">
          <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center">
            <p className="mt-2 text-2xl">
              <span className="font-medium">Company</span>
              <span className="font-light">
                {" "}
                invited you to join their workspace.
              </span>
            </p>
            <p className="max-w-sm text-muted-foreground">
              Verify your email to continue
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button
                size="lg"
                onClick={() => handleAcceptInvite()}
              >
                Accept Invite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Verify };
