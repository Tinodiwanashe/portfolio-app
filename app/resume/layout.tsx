import { Navigation_Menu } from "@/components/tutorial/Navigation_Menu";
import AuthButton from "@/components/AuthButton";
import { navItems } from "../types/data";
import Background from "@/components/tutorial/Background";
import { Footer } from "@/components/ui/Footer";
import { RootLayoutProps } from "../types/definitions";


export default function ResumeLayout({
  children
}: RootLayoutProps) {
  return (
    <>
      <Navigation_Menu navItems={navItems}>
        <AuthButton/>
      </Navigation_Menu>
      <main className="flex flex-col items-center">
        <Background/>
        {children}
        <Footer/>
      </main>
    </>
  );
}
