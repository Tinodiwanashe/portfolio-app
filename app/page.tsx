import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Background from "@/components/tutorial/Background";
import Hero from "@/components/tutorial/Hero";
import { Footer } from "@/components/ui/Footer";
import { Navigation_Menu } from "@/components/tutorial/Navigation_Menu";
import { RootLayoutProps } from "./types/definitions";
import { navItems } from "./types/data";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <HomeLayout>
      <div className="py-20">
        <Hero/>
      </div>
    </HomeLayout>
  );
}

const HomeLayout = ({children}: RootLayoutProps) => {
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