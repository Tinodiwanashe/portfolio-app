
"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
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
import { FaUser, FaSignOutAlt, FaSignInAlt, FaCog} from "react-icons/fa"

export default function AuthButton() {

  const { isLoaded, isSignedIn, user } = useUser();

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };
  
  const fullname =  user?.fullName === null || user?.fullName === undefined? "": user?.fullName;
  const initials = getInitials(fullname);

  // Display user's profile picture and name if user is authenticated {`/profile/${user.id}`}
  return user ? (
    <SignedIn>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
            <Avatar >
                <AvatarImage src={""} alt="User Profile" />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
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
    </SignedIn>
  ) : (
    // Display login link if user is not authenticated

    <SignedOut>
      <Link  href="/sign-in" className={buttonVariants({ variant: "default" })}>
        <FaSignInAlt className="mr-2 h-4 w-4" />
        <span>Login</span>
      </Link>
    </SignedOut>

  );
}
