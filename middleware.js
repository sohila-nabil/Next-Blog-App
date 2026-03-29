import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // السماح لدومينك فقط
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://next-blog-app-d6un.vercel.app",
  );
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
