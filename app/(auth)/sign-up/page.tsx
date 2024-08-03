import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function Page({
  searchParams,
}: {
  searchParams: { message?: string[] };
}) {

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      
      <form className="flex items-center justify-center py-12">
        <Link
          className={buttonVariants({ variant: "secondary" }) + " absolute right-4 top-4 md:right-8 md:top-8 z-10"} 
          href={"/"}
        >
          Home
        </Link>
        <div className="mx-auto grid w-[350px] gap-6">
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in"/>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        
      </div>
    </div>
  );
}
