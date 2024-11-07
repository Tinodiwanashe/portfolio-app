
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
    <>
      <Header socialLinks={socialLinks}>
        <AuthButton/>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Background/>
        {children}
      </main>
      <Footer socialLinks={socialLinks}/>
    </>
  )
}

export default layout