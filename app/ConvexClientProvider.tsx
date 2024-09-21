"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { RootLayoutProps } from "./types/definitions";


const clerkAppearance = {
    baseTheme: dark, //await getTheme() === "dark" ? dark : undefined,
    elements: {
      formButtonPrimary: "bg-primary text-primary-foreground shadow hover:bg-primary/90 text-sm font-medium"
    }
  }
  //appearance={clerkAppearance}bh
  
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: RootLayoutProps) {
    return (
        <ClerkProvider  appearance={clerkAppearance} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
{/*                 <AuthLoading>
                    <Loading/>
                </AuthLoading> */}
                <Authenticated>
                    {children}
                </Authenticated>
                <Unauthenticated>
                    {children}
                </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}