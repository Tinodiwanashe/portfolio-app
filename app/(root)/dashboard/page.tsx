"use client";

/* import FetchDataSteps from "@/components/tutorial/FetchDataSteps"; */
import Link from "next/link";
import { AuthRequiredError } from "@/lib/exceptions";
//import { useAuth } from "@clerk/nextjs"; //se this one on the client side
import { auth, currentUser } from '@clerk/nextjs/server' //use this one on the server side
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

export default async function ProtectedPage() {
 // const { isLoaded, userId } = useAuth(); //use this one on the client side
 //You can use the auth() helper to protect your server actions. This helper will return the current user's ID if they are signed in, or null if they are not.
  


  const [myUserId, setMyUserId] = useState<string | null>();
  // In case the user signs out while on the page.
  const store = useMutation(api.users.store);

  useEffect(() => {
    const storeUser = async () => {
      store({});  
    }
  
    const getUserId = async () => {
      const { userId } = auth(); //use this one on the server side
      setMyUserId(userId);
    }

    if (!myUserId) {
      throw new AuthRequiredError();
    }else {
      console.log("User id: ",myUserId);
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

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Dashboard screen</h2>
{/*           <FetchDataSteps /> */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <Link
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </Link>
        </p>
      </footer>
    </div>
  );
}
