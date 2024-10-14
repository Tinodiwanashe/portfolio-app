"use client";

import Link from "next/link";
import { AuthRequiredError } from "@/lib/exceptions";
//import { useUser } from "@clerk/nextjs"; //se this one on the client side
//import { auth, currentUser } from '@clerk/nextjs/server' //use this one on the server side
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthUser } from "../../../hooks/useAuthUser";
import { SignedIn } from "@clerk/nextjs";

export default function ProtectedPage() {
  const { isLoading, isAuthenticated, userId } = useAuthUser();
  if (isLoading===false && !isAuthenticated) {
    throw new AuthRequiredError();
  }

  console.log("User: ", userId);


  return (
    <SignedIn>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full">
          <div className="py-6 font-bold bg-primary text-center">
            This is a protected page that you can only see as an authenticated
            user
          </div>
        </div>

        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard/settings/profile"
                  className={buttonVariants({ variant: "default" })}
                >
                  Settings
                </Link>
              </div>
            </div>
            
        </div>
      </div>
    </SignedIn>

  );
}
