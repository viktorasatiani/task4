"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <section className="absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={200}
          height={200}
          className="w-10"
        />

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => signOut()}
            variant="outline"
          >
            <span className="relative z-10">Logout</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
