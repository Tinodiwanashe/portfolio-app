"use client";

import Background from "@/components/custom/Background";
import { RootLayoutProps } from "../types/definitions";
import { Footer } from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import React from 'react'

const layout = ({children}: RootLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Background/>    
      <main className="flex-1 gap-4 md:gap-8 px-4 md:px-8">    
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default layout