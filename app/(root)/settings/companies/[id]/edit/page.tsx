

import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CompanyForm from "../../_components/CompanyForm";
import React from 'react';

export default async function page({ params }: { params: { id: Id<"Company"> } }) {
  const {id} = params;
  const company = await preloadQuery(api.companies.getCompany,{CompanyId: id});
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Company</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add company details.
        </p>
      </div>
      <Separator />
      <CompanyForm preloadedCompany={company} />
    </div>
  )
}
