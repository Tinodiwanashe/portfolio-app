
import Background from "@/components/custom/Background";
import { Footer } from "@/components/layouts/Footer";
import AuthButton from "@/components/custom/AuthButton";
import Header from "@/components/layouts/Header";
import { RootLayoutProps } from "@/app/types/definitions";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";



const layout = ({children}: RootLayoutProps) => {
  const socialLinks = useQuery(api.users.getUserSocialLinks,{});
  return (
    <div className="min-h-screen flex flex-col">
      <Header socialLinks={socialLinks}>
        <AuthButton/>
      </Header>
      <main className="flex-1 gap-4 md:gap-8 px-4 md:px-8">
        <Background/>
        {children}
      </main>
      <Footer socialLinks={socialLinks}/>
    </div>
  )
}

export default layout