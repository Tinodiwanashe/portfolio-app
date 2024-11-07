"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage, 
  AvatarImage as OriginalAvatarImage 
} from "@/components/ui/avatar";
import { 
  SignedIn, 
  SignedOut, 
  SignOutButton, 
  useUser 
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FaUser, FaRightFromBracket, FaRightToBracket, FaGear } from "react-icons/fa6";
import { getInitials } from "@/lib/utils";

export default function AuthButton() {
  const { isLoaded, isSignedIn, user } = useUser();

  const fullName = user?.fullName ?? "";
  const pictureUrl = user?.imageUrl;

  // Nullish Coalescing (??) and Optional Chaining (?.) are two new features in JavaScript that were introduced in ECMAScript 2020.
  // A nullish value in JavaScript is either null or undefined.
  // The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side 
  // operand is null or undefined, and otherwise returns its left-hand side operand. e.g:
  //    null ?? "Hello World" // "Hello World"
  //    undefined ?? "Hello World" //"Hello World"
  //    0 ?? "Hello World" // 0

  // Memoize user object to ensure stable props for MemoizedDropdownMenu
   const memoizedUser = {
    user,
    fullName,
    pictureUrl
  }; 

  // Display user's profile picture and name if user is authenticated
  return user? (
    <SignedIn>
      <SignedInDropdownMenu user={memoizedUser} fullName={memoizedUser.fullName} />
    </SignedIn>
  ) : (
    <SignedOut>  {/* Display login link if user is not authenticated */}
      <Link href="/sign-in" className={buttonVariants({ variant: "default" })}>
        <FaRightToBracket className="mr-2 h-4 w-4" />
        <span>Login</span>
      </Link>
    </SignedOut>
  );
}

const SignedInDropdownMenu = ({ user, fullName }: { user: any, fullName: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
      <Avatar>
        <AvatarImage  src={user?.pictureUrl} alt="User Profile" />
        <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuLabel>
        <p className="text-sm font-medium leading-none">My Account</p>
        <p className="text-xs leading-none text-muted-foreground">
          {user?.primaryEmailAddress}
        </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="/user-profile">
          <DropdownMenuItem>
            <FaUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings/profile">
          <DropdownMenuItem>
            <FaGear className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <SignOutButton>
        <DropdownMenuItem>
          <FaRightFromBracket className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </SignOutButton>
    </DropdownMenuContent>
  </DropdownMenu>
);
