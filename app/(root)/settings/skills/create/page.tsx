"use client";

import { Separator } from "@/components/ui/separator";
import NewSkillForm from "../_components/NewSkillForm";
import React from 'react';

export default function page() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Skill</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add Skill details.
        </p>
      </div>
      <Separator />
      <NewSkillForm/>
    </div>
  )
}