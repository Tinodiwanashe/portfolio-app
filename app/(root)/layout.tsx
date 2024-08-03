
import Background from "@/components/tutorial/Background";
import { navItems } from "../types/data";
import { RootLayoutProps } from "../types/definitions";
import { Footer } from "@/components/layouts/Footer";
import AuthButton from "@/components/AuthButton";
import { Header } from "@/components/layouts/Header";

const layout = ({children}: RootLayoutProps) => {
  return (
    <>
      <Header navItems={navItems}>
        <AuthButton/>
      </Header>
      <main className="flex flex-col items-center">
        <Background/>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default layout