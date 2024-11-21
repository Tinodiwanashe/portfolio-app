"use client"

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FaBars } from "react-icons/fa"
import Logo from '../custom/Logo';
import { Button } from "../ui/button"
import { ModeToggle } from "../custom/ModeToggle"
import { menuItems } from "@/app/types/data"
import Menu from "./Menu"
import SocialMediaIcon from "../custom/SocialMediaIcon";
import { RootLayoutProps } from "@/app/types/definitions";

 type HeaderProps = RootLayoutProps & {
    socialLinks: {
      value: string;
    }[] | undefined
}

//you cannot export an async functioon within a client component. The solution here is to use the use state and use effect hook
 const Header = ({
    children,
    socialLinks
  }: HeaderProps) => {
    

  return (
    <header className='sticky z-50 flex items-center gap-4 top-0 h-16 w-full px-4 md:px-6 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' >
      {/* <div className="container h-14 max-w-screen-2xl flex items-center"> */}
        <div className='mr-4 hidden md:flex lg:flex'>
          <Logo href= '/' classNames = 'mr-6 space-x-2'/> 
          <Menu menuItems={menuItems} orientation="horizontal"/>
        </div>
        <Sheet>
          <SheetTrigger asChild className="p-2 transition">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <FaBars className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>
                  <Logo href= '/' classNames = 'mr-6 space-x-2'/>
                </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              test
            </SheetDescription>
            <div className="space-y-3 ">
              <Menu menuItems={menuItems} orientation="vertical" className="flex flex-col font-medium items-start md:text-base"/>
            </div>
            <SheetFooter>

            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 w-full">
          {
            socialLinks && socialLinks.map((item, index) => {
              return (
                <SocialMediaIcon key={index} url={item.value}/>
              )
            })
          }
          <ModeToggle/>
          {children}
        </div>
      {/* </div> */}
    </header>

  )
}

export default Header;



