import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { updateSession } from "@/utils/supabase/middleware";

/* export async function middleware(request: NextRequest) {
  return await updateSession(request);
} */

export default clerkMiddleware((req) => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    /* // Skip Next.js internals and all static files, unless found in search params
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:html?|css|js(?!on)|svg|png|jpg|jpeg|gif|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest|webp)$).*)",

    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
