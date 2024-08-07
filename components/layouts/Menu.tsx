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
import Link from "next/link"
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react"
import { MenuItem, SubMenuItem } from "@/app/types/definitions"

const Menu = ({
    menuItems,
    orientation
  }: {
    menuItems: MenuItem[];
    orientation?: "vertical" | "horizontal";
  }) => {
    return (
      <NavigationMenu orientation={orientation} className="hidden xl:flex items-center gap-8">            
        <NavigationMenuList className="hidden md:flex md:space-x-4">
          {menuItems.map((menuItem, index) => {
            return (
              menuItem.SubMenuItems?.length?
              (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>
                    {/* {menuItem.icon && <menuItem.icon className="h-5 w-5"/>}  */}
                    {menuItem.label}
                  </NavigationMenuTrigger>
                  <SubMenu SubMenuItems={menuItem.SubMenuItems} />
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={index}>
                  <Link href={menuItem.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {/* {menuItem.icon && <menuItem.icon className="h-5 w-5"/>} */}
                      {menuItem.label} 
                    </NavigationMenuLink>                    
                  </Link>
                </NavigationMenuItem>
              ) 
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  export default Menu
  
  const SubMenu = ({
  SubMenuItems,
  className
  } :{
  SubMenuItems?: SubMenuItem[];   
  className?: string;
  }) => {
  return (
    <NavigationMenuContent className={cn("", className)}>
      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {SubMenuItems?.map((subMenuItem, index) => (
          <ListItem
          key={index}
          title={subMenuItem.label}
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            , className)}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
  })
  ListItem.displayName = "ListItem"