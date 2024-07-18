
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubmitButton } from "./submit-button";
import { signOut } from "@/app/login/actions";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

/*   const {
    data: { userProfile }
  } = await getUserProfile(supabase); */


  // Display user's profile picture and name if user is authenticated {`/profile/${user.id}`}
  return user ? (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src='' alt={user.email}/>
        <AvatarFallback>{user.email}</AvatarFallback>
      </Avatar>
      <span>{user.email}</span>
      <form>
        <SubmitButton
          formAction={signOut}
          className=""
          loadingText="Logging Out..."
        >
          Logout
        </SubmitButton>
      </form>
    </div>
  ) : (
       // Display login link if user is not authenticated
    <Link  href="/login" className={buttonVariants({ variant: "default" })}>
      Login
     </Link>
  );
}
