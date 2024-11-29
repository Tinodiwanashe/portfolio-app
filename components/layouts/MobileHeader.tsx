import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FaBars } from "react-icons/fa"
import { Button } from "../ui/button"
import { RootLayoutProps } from "@/app/types/definitions"
import Logo from "../custom/Logo"
import Menu from "./Menu"
import { menuItems } from "@/app/types/data";
import React from 'react'

const MobileHeader = ({children}: RootLayoutProps) => {
  return (
    <>
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
          </SheetDescription>
          <div className="space-y-3 ">
            <Menu menuItems={menuItems} orientation="vertical" className="flex flex-col font-medium items-start md:text-base"/>
          </div>
          <SheetFooter>
            <div className="flex flex-col items-center gap-2 sm:gap-2 w-full">
              {children}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>    
    </>
  )
}

export default MobileHeader