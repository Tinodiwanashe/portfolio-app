
import Hero from "@/components/tutorial/Hero";
import Skills from "./_components/Skills";
import Experience from "./_components/Experience";

export default async function Index() {


  return (
    <div className="py-20">
      <Hero/>
      <Skills/>
      <Experience/>
    </div>
  );
}