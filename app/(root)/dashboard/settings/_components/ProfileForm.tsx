"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ProfileFormValues, ProfileFormSchema, User, Country } from "@/app/types/definitions";
import { Label } from "@/components/ui/label";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

/* interface CreateFormProps {
  userId: Id<"User">;
} */

export function ProfileForm(/* {
  user,
  countries
}: {
  user: User;
  countries: Country[];
} */) {
  const { data:user, isPending, error } = useQuery(convexQuery(api.users.getCurrentUser,{}));
  const { data: countries, isPending: isLoading } = useQuery(convexQuery(api.countries.getCountries,{}));

    const {
      mutate,
      pending
    } = useApiMutation(api.users.updateUser);

    console.log("error: ", error);

/*     const [usert, setUserT] = useState<User| null>(null);
    
    useEffect(() => {
      async function fetchPosts() {
        setUserT(user);
      }
      fetchPosts()
    }, []);
    console.log("user: ", user); */

    /*if (user === undefined) {
      return <div>Loading...</div>
    } */ 
    //commented this if out because it was resulting in the following "Rendered more hooks than during the previous render."

  // 1. Define your form and set default values. These values can come from database or API
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: user?.name,
      pictureUrl: user?.pictureUrl,
      phoneNumber: "0848706127",
      address: user?.address?.toString(),
      countryId: user?.countryId?.toString(), // default to empty string. Will be filled dynamically when selecting a country.
      socialLinks: user?.socialLinks
    },
    mode: "onChange"
  })

  const { fields, append } = useFieldArray({
    name: "socialLinks",
    control: form.control
  })


/*   async function handleCountryChange(countryName: string) {
    if (countries === undefined) return;
    const selectedCategory = countries.find(country => country.name === countryName);
  } */

  // 2. Define a submit handler.
  async function onSubmit(data: ProfileFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data)
        // You can now use these values for mutation.
      mutate({
        id: user?._id,
        phoneNumber: data.phoneNumber,
        address: data.address,
        countryId: data.countryId,  
        socialLinks: data.socialLinks
      })
          .then(() => {
            toast.success("User updated successfully!")
          })
          .catch((error) => {
            toast.error(
              <>
                <span>Something is wrong! </span>
                {/* <div>{error}</div> */}
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
              </>
            )
          });
      //form.reset();
  }

  return user && !isPending && error===null && (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="pictureUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={user.pictureUrl} alt="Avatar" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>  
                    <div className="grid gap-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.email}
                      </div>
                    </div> 
                  </div>              
                </FormControl>
                <FormDescription>
                  This is the current logged in user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="address">Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your address" {...field} className="resize-none" />
                </FormControl>
                <FormDescription>
                  This is your address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  {countries && (
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country._id} value={country._id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
                <FormDescription>
                  Select a country most relevant to the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <div>
            {fields.map((field,index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`socialLinks.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
function fetchData() {
  throw new Error("Function not implemented.");
}

