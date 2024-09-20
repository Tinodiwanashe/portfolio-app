/* import FetchDataSteps from "@/components/tutorial/FetchDataSteps"; */
import Link from "next/link";
import { AuthRequiredError } from "@/lib/exceptions";
import { useAuth } from "@clerk/nextjs";

export default async function ProtectedPage() {
  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    throw new AuthRequiredError();
  }

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
