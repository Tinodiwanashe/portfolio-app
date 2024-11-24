import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkRole } from "./utils/roles";

// createRouteMatcher() is a Clerk helper function that allows you to protect multiple routes. 
// It accepts an array of routes and checks if the route the user is trying to visit matches one of the routes passed to it.
// The createRouteMatcher() helper returns a function that, if called with the req object from the Middleware, will return true if the user is trying to access a route that matches one of the routes passed to createRouteMatcher().

const isProtectedRoute = createRouteMatcher(["/settings(.*)"]);

// The clerkMiddleware() helper integrates Clerk authentication into your Next.js application through Middleware. 
// clerkMiddleware() is compatible with both the App and Pages routers. 

// This Middleware does not protect any routes by default. Therefore you should explicitly specify the routes to protect.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware

export default clerkMiddleware(async (auth,req) => {

  if (isProtectedRoute(req)) {
    await auth().protect();
/*     if (await checkRole("admin")){
      await auth().protect(); // used if you want to redirect unauthenticated users to the sign-in route automatically.
    } else {
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)      
    } */
  }
  //Use auth().userId if you want more control over what your app does based on user authentication status.
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
