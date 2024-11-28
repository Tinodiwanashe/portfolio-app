import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import OccupationForm from "../../_components/OccupationForm";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import React from 'react';

export default async function page({ params }: { params: { id: Id<"Occupation"> } }) {
  const { id } = params;
  const [occupation, companies] = await Promise.all([
    preloadQuery(api.occupations.getOccupation, { id: id }),
    preloadQuery(api.companies.getCompanies)
  ]); //Promise.all makes all my API calls in parallel and returns an array of the results.

  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Occupation</h3>
        <p className="text-sm text-muted-foreground">
          This is where you add occupation details.
        </p>
      </div>
      <Separator />
      <OccupationForm preloadedOccupation={occupation} preloadedCompanies={companies} />
    </div>
  )
}