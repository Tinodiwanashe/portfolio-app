"use client";

/* import FetchDataSteps from "@/components/tutorial/FetchDataSteps"; */
import Link from "next/link";
import { AuthRequiredError } from "@/lib/exceptions";
import { useUser } from "@clerk/nextjs"; //se this one on the client side
//import { auth, currentUser } from '@clerk/nextjs/server' //use this one on the server side
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProtectedPage() {
  const { isLoaded, isSignedIn, user } = useUser(); //use this one on the client side
 //You can use the auth() helper to protect your server actions. This helper will return the current user's ID if they are signed in, or null if they are not.
  
  // In case the user signs out while on the page.
  const store = useMutation(api.users.store);

  useEffect(() => {
    console.log("User id: ",user?.id);
    const storeUser = async () => {
      await store({});  
    }
    if (!isLoaded || !isSignedIn) {
      throw new AuthRequiredError();
    } else { 
      storeUser();
    }     
  }, [store]); 

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
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
  );
}
