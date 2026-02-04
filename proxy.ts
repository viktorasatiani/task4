import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = { matcher: ["/"] };
