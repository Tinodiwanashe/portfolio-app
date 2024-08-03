"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FaHamburger } from "react-icons/fa"
import Logo from '../Logo';
import { Button } from "../ui/button"
import { ModeToggle } from "../tutorial/ModeToggle"
import { useState, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from "react"
import { socials } from "@/app/types/data"
import { Dialog, DialogClose } from "@/components/ui/dialog"

//you cannot export an async functioon within a client component. The solution here is to use the use state and use effect hook

export function Header({
    navItems,
    children,
  }: {
    navItems: {
      name: string;
      href: string;
      icon?: React.ReactNode | JSX.Element | any;
      hasProductItem: boolean;
      SubMenu?: {
          title: string;
          href: string;
          src?: string;
          icon?: React.ReactNode | JSX.Element | any,
          description?: string;   
        }[];
    }[];
    children: React.ReactNode;
  }) {

/*     //determines whether the user has an active session/user is logedIn
    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
      const fetchSession = async () => {
        const supabase = createClient();
        const { data, error } =  await supabase.auth.refreshSession();
        if (error) {
          console.error("Error fetching session:", error);
        } else {
          setSession(data.session);
        }
      }
      fetchSession();
    }, []) */

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' >
      <div className="container h-14 max-w-screen-2xl flex items-center">
        <div className='mr-4 hidden md:flex lg:flex'>
          <div className="flex justify-between w-full min-[825px]:hidden">
            <Dialog>
                <SheetTrigger className="p-2 transition">
                    <FaHamburger />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Next Starter</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3 mt-[1rem]">
                        <DialogClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full">Home</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/dashboard" legacyBehavior passHref className="cursor-pointer">
                                <Button variant="outline">
                                    Dashboard
                                </Button>
                            </Link>
                        </DialogClose>
                    </div>
                </SheetContent>
            </Dialog>
            <ModeToggle />
          </div>
          <Logo href= '/' classNames = 'mr-6 space-x-2'/> 
          <NavigationMenu className="hidden xl:flex items-center gap-8">            
            <NavigationMenuList className="hidden md:flex md:space-x-4">

              {navItems.map((navItem, index) => {
                const iconn = navItem.icon;
                return (
                  navItem.SubMenu?.length?
                  (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                      {navItem.name}
                      </NavigationMenuTrigger>
                      <NavigationSubMenu SubMenu={navItem.SubMenu} />
                    </NavigationMenuItem>
                  ):(
                    
                    <NavigationMenuItem key={navItem.name}>
                      <Link href={navItem.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {/* {navItem.icon && <navItem.icon className="h-5 w-5" />} */}
                        {navItem.name} 
                        </NavigationMenuLink>                    
                      </Link>
                    </NavigationMenuItem>
                  ) 
                );
              })}
            </NavigationMenuList>
      </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
          {
            socials.map((item, index) => {
              return (
                <Button 
                  className="h-[2.3rem] w-[2.3rem]"
                  variant="outline" 
                  size={"icon"}
                  key={index}
                >
                  {item.icon}
                </Button>
              )
            })
          }
        <ModeToggle/>
        {children}
        </div>

      </div>

    </header>

  )
}

function NavigationSubMenu({
  SubMenu,
  className
} :{
  SubMenu?: {
      title: string;
      href: string;
      src?: string;
      icon?: React.ReactNode | JSX.Element | any,
      description?: string;   
  }[];   
  className?: string;
}) {
return (
    <NavigationMenuContent className="mt">
      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {SubMenu?.map((subMenuItem) => (
          <ListItem
          key={subMenuItem.title}
          title={subMenuItem.title}
          href={subMenuItem.href}
          >
            {subMenuItem.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
)
}

const ListItem = forwardRef<
ElementRef<"a">,
ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
return (
  <li className="row-span-3">
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
)
})
ListItem.displayName = "ListItem"

