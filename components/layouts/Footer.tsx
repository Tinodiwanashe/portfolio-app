"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SocialMediaIcon from "../tutorial/SocialMediaIcon";

export const Footer = () => {
  const socialLinks = useQuery(api.users.getSocialLinks);
  return (
    //"w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"
    <footer className="max-w-screen-xl w-full text-center text-xs border-t border-t-foreground/10" >
      <div className="mx-auto max-w-7xl md:flex md:items-center md:justify-between p-6">
        <div className="flex justify-center space-x-6 md:order-2">
          {
            socialLinks && socialLinks.map((item, index) => {
              return (
                <SocialMediaIcon url={item.value}/>
              )
            })            
          }
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 ">
          &copy; {new Date().getFullYear()} <span className="text-purple">Munyaradzi Kandoro</span>. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};
  
