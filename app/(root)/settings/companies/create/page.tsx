"use client";

import { Separator } from "@/components/ui/separator";
import NewCompanyForm from "../_components/NewCompanyForm";

export default function page() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Company</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add company details.
        </p>
      </div>
      <Separator />
      <NewCompanyForm/>
    </div>
  )
}