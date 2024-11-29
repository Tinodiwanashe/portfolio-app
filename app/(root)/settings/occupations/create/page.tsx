"use client";

import { Separator } from "@/components/ui/separator";
import NewOccupationForm from "../_components/NewOccupationForm";
import React from 'react';


export default function page() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Occupation</h3>
        <p className="text-sm text-muted-foreground">
          This is where you will add Occupation details.
        </p>
      </div>
      <Separator />
      <NewOccupationForm/>
    </div>
  )
}