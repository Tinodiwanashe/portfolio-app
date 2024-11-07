"use client";

import Background from "@/components/custom/Background";
import { RootLayoutProps } from "../types/definitions";
import { Footer } from "@/components/layouts/Footer";
import AuthButton from "@/components/custom/AuthButton";
import Header from "@/components/layouts/Header";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { TracingBeam } from "@/components/ui/tracing-beam";

const layout = ({children}: RootLayoutProps) => {
  const socialLinks = useQuery(api.users.getUserSocialLinks,{});
  return (
    <div className="min-h-screen flex flex-col">
      <Header socialLinks={socialLinks}>
        <AuthButton/>
      </Header>
      <Background/>
      
      <main className="flex-1 gap-4 md:gap-8 px-4 md:px-8">    
        {children}
      </main>
      <Footer socialLinks={socialLinks}/>
    </div>
  )
}

export default layout