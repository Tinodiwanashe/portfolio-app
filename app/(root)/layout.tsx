
import Background from "@/components/tutorial/Background";
import { Navigation_Menu } from "@/components/tutorial/Navigation_Menu";
import { navItems } from "../types/data";
import { RootLayoutProps } from "../types/definitions";
import { Footer } from "@/components/layouts/Footer";
import AuthButton from "@/components/AuthButton";

const layout = ({children}: RootLayoutProps) => {
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
  )
}

export default layout