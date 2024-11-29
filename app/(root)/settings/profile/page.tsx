import { Separator } from "@/components/ui/separator";
import ProfileForm from "./_components/ProfileForm";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/app/auth";
import React from 'react';

export default async function page() { 
  //To make authenticated requests to Convex during server rendering, pass a JWT token to preloadQuery or fetchQuery in the third options argument:
  const token = await getAuthToken();
  const [user, countries] = await Promise.all([
    await preloadQuery(api.users.getCurrentUser,{},{ token }),
    await preloadQuery(api.countries.getCountries)
  ]);
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm preloadedUser={user} preloadedCountries={countries} />
    </div>
  )
}