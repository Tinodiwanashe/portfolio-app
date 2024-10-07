import { Separator } from "@/components/ui/separator";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api"
import ProfileForm from "../_components/ProfileForm";
import { notFound } from "next/navigation";


export default async function page() {
   const [user, countries] = await Promise.all([ 
    preloadQuery(api.users.getCurrentUser),
    preloadQuery(api.countries.getCountries)
  ]); 


  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} countries={countries}/>
    </div>
  )
}