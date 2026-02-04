import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import type { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import { randomBytes, randomUUID } from "crypto";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type UserType = InferSchemaType<typeof User.schema>;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: { email: string; password: string } | undefined,
      ) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
   
  ],
  callbacks: {
    async signIn({ user }: { user: UserType}) {
      await connectMongoDB();

      const existingUser = await User.findOne({ email: user.email });
      if (existingUser && existingUser.isBlocked) {
        return false;
      }
      return true;
    },
  },
  session: {
    strategy: "jwt" as const, // Use 'jwt' or 'database'
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
