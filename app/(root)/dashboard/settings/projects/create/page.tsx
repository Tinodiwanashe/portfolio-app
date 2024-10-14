"use client";

import { Separator } from "@/components/ui/separator";
import NewProjectForm from "../_components/NewProjectForm";


export default function page() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Project</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add Project details.
        </p>
      </div>
      <Separator />
      <NewProjectForm/>
    </div>
  )
}