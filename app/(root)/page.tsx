
import Hero from "@/components/tutorial/Hero";

export default async function Index() {


  return (
    <div className="py-20">
      <Hero isSupabaseConnected={true}/>
    </div>
  );
}