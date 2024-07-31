import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignIn, UserProfile } from "@clerk/nextjs";

export default function Page({
  searchParams,
}: {
  searchParams: { message?: string[] };
}) {

  return (
    <SignedIn>
      <div className="h-full flex items-center justify-center p-9">
        <UserProfile path="/user-profile" routing="path" />
      </div>
    </SignedIn>
  );
}
