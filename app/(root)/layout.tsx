
import Background from "@/components/tutorial/Background";
import { RootLayoutProps } from "../types/definitions";
import { Footer } from "@/components/layouts/Footer";
import AuthButton from "@/components/AuthButton";
import Header from "@/components/layouts/Header";




const layout = ({children}: RootLayoutProps) => {
  return (
    <>
      <Header>
        <AuthButton/>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* <Background/> */}
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default layout