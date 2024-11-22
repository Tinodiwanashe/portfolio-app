import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import UserForm from "../../_components/UserForm";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function page({ params }: { params: { id: Id<"User"> } }) {
  const { id } = params;
  const [user, countries] = await Promise.all([
    preloadQuery(api.users.getUser,{id: id}),  
    preloadQuery(api.countries.getCountries)
  ]); //Promise.all makes all my API calls in parallel and returns an array of the results.

/*  Promise.all is actually a promise that takes an array of promises as an input (an iterable). 
    Then it gets resolved when all the promises get resolved or any one of them gets rejected.
*/

  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">User</h3>
        <p className="text-sm text-muted-foreground">
        This is where you will add This is where you will add Occupation details. details.
        </p>
      </div>
      <Separator />
      <UserForm preloadedUser={user} preloadedCountries={countries} />
    </div>
  )
}