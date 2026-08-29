export { default } from "next-auth/middleware";

// Matcher specifies which pages require a Discord login
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
