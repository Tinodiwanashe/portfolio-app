
import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/tutorial/Hero";

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
    <div className="py-20">
      <Hero isSupabaseConnected={isSupabaseConnected}/>
    </div>
  );
}