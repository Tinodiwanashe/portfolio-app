"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { RootLayoutProps } from "@/app/types/definitions";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



const clerkAppearance = {
    baseTheme: dark, //await getTheme() === "dark" ? dark : undefined,
    elements: {
      formButtonPrimary: "bg-primary text-primary-foreground shadow hover:bg-primary/90 text-sm font-medium"
    }
  }
  //appearance={clerkAppearance}bh
  
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

export function ConvexClientProvider({ children }: RootLayoutProps) {
    return (
        <ClerkProvider  appearance={clerkAppearance} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <QueryClientProvider client={queryClient}>
                  
                    <Authenticated>
                        {children}
                    </Authenticated>
                    <Unauthenticated>
                        {children}
                    </Unauthenticated>                
                    <AuthLoading>
                        <div>Loading...</div>
                    </AuthLoading>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>   
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
