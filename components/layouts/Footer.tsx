"use client";

import React from "react";
import SocialMediaIcon from "../custom/SocialMediaIcon";

type FooterProps = {
  socialLinks: {
    value: string;
  }[] | undefined
}

export const Footer = () => {
  return (
    //"w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"
    <footer className="py-6 md:px-8 md:py-0 border-t border-t-foreground/10 glassmorphism" >
      <div className="container flex items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 ">
            &copy; {new Date().getFullYear()} <span className="text-purple-500 dark:text-purple">Munyaradzi Kandoro</span>. All rights reserved. 
          </p>
        </div>          
{/*         <div className="flex justify-center space-x-6 md:order-2">
          {
            props.socialLinks && props.socialLinks.map((item, index) => {
              return (
                <SocialMediaIcon  key={index} url={item.value}/>
              )
            })            
          }
        </div> */}
      </div>
    </footer>
  );
};
  
