"use client"

import Logo from '../custom/Logo';
import { ModeToggle } from "../custom/ModeToggle"
import { menuItems } from "@/app/types/data"
import Menu from "./Menu"
import AuthButton from "../custom/AuthButton";
import MobileHeader from "./MobileHeader";

//you cannot export an async functioon within a client component. The solution here is to use the use state and use effect hook
 const Header = () => {
    

  return (
    <header className='sticky z-50 flex items-center gap-4 top-0 h-16 w-full px-4 md:px-6 border-b border-border/40 glassmorphism' >
      <div className='mr-4 hidden md:flex lg:flex'>
        <Logo href= '/' classNames = 'mr-6 space-x-2'/> 
        <Menu menuItems={menuItems} orientation="horizontal"/>
      </div>
      <MobileHeader>
        <ModeToggle/>
        <AuthButton/>       
      </MobileHeader>
      <div className="w-full flex flex-1 items-center justify-end gap-2 sm:gap-2">
        <ModeToggle/>
        <AuthButton/>
      </div>
    </header>

  )
}

export default Header;



