

import Hero from "@/components/custom/Hero";
import SkillsBentoGrid from "./_components/SkillsBentoGrid";
import Experience from "./_components/Experience";
import Projects from "@/components/custom/Projects";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export default async function Index() {
  const [user] = await Promise.all([preloadQuery(api.users.getUserByName, {name: "Munyaradzi Kandoro"})]);

  return user && (    
    <>
      <Hero preloadedUser={user} />    
       
      <Experience preloadedUser={user}/>
      <SkillsBentoGrid preloadedUser={user}/>
      <Projects preloadedUser={user}/>
    </>
  );
}