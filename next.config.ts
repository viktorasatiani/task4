import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
    NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
    NEXT_PUBLIC_USER_ID: process.env.NEXT_PUBLIC_USER_ID,
    MONGODB_URI: process.env.MONGODB_URI,
    SHADCNBLOCKS_API_KEY: process.env.SHADCNBLOCKS_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  /* config options here */
};

export default nextConfig;
