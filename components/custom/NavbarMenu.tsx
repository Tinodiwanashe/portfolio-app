"use client";

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { clsx } from 'clsx';

export function NavbarMenu({
    navItems,
    className
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
    className?: string;
  }) {

    const [active, setActive] = useState<string | null>(null);
    return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}>   
        <Menu setActive={setActive}>
            {navItems.map((navItem) => {
                console.log(JSON.stringify(navItem));            
                return (
                                           
                    navItem.SubMenu === undefined || navItem.SubMenu.length === 0 ? 
                    (
                        <MenuItem setActive={setActive} active={active} item={navItem.name} ></MenuItem>
                    ) : ( 
                        <MenuItem setActive={setActive} active={active} item={navItem.name} >  
                            <div className= {clsx('text-sm',
                                {
                                    'grid grid-cols-2 gap-10 p-4': navItem.hasProductItem === true,
                                    'flex flex-col space-y-4': navItem.hasProductItem === false
                                } 
                            )}>
                                
                                {navItem.SubMenu?.map((subMenuItem, index) => {
                                    
                                    const productItem_src = subMenuItem.src === undefined ? '' : subMenuItem.src;                                     
                                    return (
                                        navItem.hasProductItem === true ? 
                                        ( 
                                            <ProductItem 
                                                title={subMenuItem.title} 
                                                description={subMenuItem.description}  
                                                href={subMenuItem.href} 
                                                src={productItem_src} 
                                            />                                                   
                                        ) : (                 
                                            <HoveredLink href={subMenuItem.href} key={index}>
                                                {subMenuItem.title}
                                            </HoveredLink>
                                        )
                                    );
                                })} 
                                
                            </div>
                        </MenuItem>
                    )
                        
                    
                ); 
            })}
        </Menu>

    </div>

    )
}



