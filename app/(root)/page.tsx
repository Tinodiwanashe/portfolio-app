
import Hero from "@/components/custom/Hero";
import SkillsBentoGrid from "./_components/SkillsBentoGrid";
import Experience from "./_components/Experience";
import Projects from "@/components/custom/Projects";

export default async function Index() {
  return (    
    <>
      <Hero/>    
       
      <Experience/>
      <SkillsBentoGrid/>
      <Projects/>
    </>
  );
}