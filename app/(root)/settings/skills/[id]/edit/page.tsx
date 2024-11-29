

import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import SkillForm from "../../_components/SkillForm";
import React from 'react';

export default async function page({ params }: { params: { id: Id<"Skill"> } }) {
  const {id} = params;
  const skill = await preloadQuery(api.skills.getSkill,{id: id});
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Skill</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add skill details.
        </p>
      </div>
      <Separator />
      <SkillForm preloadedSkill={skill}  />
    </div>
  )
}
