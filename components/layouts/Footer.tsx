"use client";

import React from "react";
import { socials } from "@/app/types/data";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    //"w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"
    <footer className="w-full text-center text-xs border-t border-t-foreground/10" >
      <div className="mx-auto max-w-7xl md:flex md:items-center md:justify-between p-6">
        <div className="flex justify-center space-x-6 md:order-2">
          {socials.map((item, index) => (
            <Button 
              variant="outline" 
              size={"icon"} 
              key={index} 
              className="h-[2.3rem] w-[2.3rem]" 
            > 
              <span className="sr-only">{item.name}</span> 
              {item.icon} 
            </Button>
          ))}
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
  
