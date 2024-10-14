"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback, 
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
import { FaUser, FaSignOutAlt, FaSignInAlt, FaCog } from "react-icons/fa";
import { getInitials } from "@/lib/utils";

export default function AuthButton() {
  const { isLoaded, isSignedIn, user } = useUser();

  const fullName = user?.fullName === null || user?.fullName === undefined ? "" : user?.fullName;

  // Memoize user data to ensure stable props for MemoizedAvatar
  const userData = useMemo(() => ({
    imageUrl: user?.imageUrl || "",
    fullName
  }), [user?.imageUrl, fullName]);

  // Memoize user object to ensure stable props for MemoizedDropdownMenu
  const memoizedUser = useMemo(() => user, [user]);

  // Display user's profile picture and name if user is authenticated
  return memoizedUser ? (
    <SignedIn>
      <MemoizedDropdownMenu user={memoizedUser} fullName={userData.fullName} />
    </SignedIn>
  ) : (
    <SignedOut>  {/* Display login link if user is not authenticated */}
      <Link href="/sign-in" className={buttonVariants({ variant: "default" })}>
        <FaSignInAlt className="mr-2 h-4 w-4" />
        <span>Login</span>
      </Link>
    </SignedOut>
  );
}

// Memoized AvatarImage component
const MemoizedAvatarImage = memo(OriginalAvatarImage);

// Memoize the Avatar component to prevent unnecessary rerenders
const MemoizedAvatar = React.memo(({ imageUrl, fullName }: { imageUrl: string, fullName: string }) => (
  <Avatar>
    <MemoizedAvatarImage src={imageUrl} alt="User Profile" />
    <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
  </Avatar>
));

const MemoizedDropdownMenu = React.memo(({ user, fullName }: { user: any, fullName: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
      <MemoizedAvatar imageUrl={user.imageUrl} fullName={fullName} />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="/user-profile">
          <DropdownMenuItem>
            <FaUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/settings">
          <DropdownMenuItem>
            <FaCog className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <SignOutButton>
        <DropdownMenuItem>
          <FaSignOutAlt className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </SignOutButton>
    </DropdownMenuContent>
  </DropdownMenu>
));
