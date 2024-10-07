"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { Label } from "@/components/ui/label";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ProfileFormSchema, ProfileFormValues } from "@/app/types/definitions";

type props = {
  formRecord: ProfileFormValues;
  userId: Id<"User"> | undefined;
}


/*  props: {
  userData: Preloaded<typeof api.users.getCurrentUser>;
  countriesData: Preloaded<typeof api.countries.getCountries>;
} */

/*   const user = usePreloadedQuery(props.userData);
  const countries = usePreloadedQuery(props.countriesData);  */ 

export default function ProfileForm() {  
  
  const user = useQuery(api.users.getCurrentUser);  
  const countries = useQuery(api.countries.getCountries);   
  const {
    mutate,
    pending
  } = useApiMutation(api.users.updateUser);  
  
    // 1. Define your form and set default values. These values can come from database or API
  const formRecord: Partial<ProfileFormValues> = {
    name: user?.name,
    email: user?.email,
    pictureUrl: user?.pictureUrl,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    countryId: user?.countryId?.toString(), // default to empty string. Will be filled dynamically when selecting a country.
    socialLinks: user?.socialLinks
  } 

      // 1. Define your form and set default values. These values can come from database or API
      const values: ProfileFormValues = {
        name: user?.name,
        email: user?.email,
        pictureUrl: user?.pictureUrl,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        countryId: user?.countryId?.toString(), // default to empty string. Will be filled dynamically when selecting a country.
        socialLinks: user?.socialLinks
      } 

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema), //Integrates with your preferred schema validation library.
    defaultValues: formRecord,
    values,  // will get updated once values returns - will get updated when values props updates    
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
    mode: "onChange"
  })

  //form.setValue("phoneNumber", formRecord?.phoneNumber);
  //form.setValue("address", formRecord?.address);
  //form.setValue("countryId", formRecord?.countryId?.toString()); 
  //form.setValue("socialLinks", formRecord?.socialLinks); 

  const { append, fields } = useFieldArray({
    name: "socialLinks", // unique name for your Field Array
    control: form.control // control props comes from useForm (optional: if you are using FormContext)
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: ProfileFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
    console.log(values)

      // You can now use these values for mutation.
      mutate({
        id: user?._id,
        phoneNumber: values.phoneNumber,
        address: values.address,
        countryId: values.countryId ,  
        socialLinks: values.socialLinks
      }).then(() => {
            toast.success("User updated successfully!")
          })
          .catch((error) => {
            toast.error("Failed to update"
            )
          });
      form.reset();
    } catch (error) {
      
    }
  }

  return formRecord && (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <>
            <Label>Full Name</Label>
            <div className="flex flex-row gap-3 items-center">
              <Avatar>
                <AvatarImage src={formRecord.pictureUrl} alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>  
              <div className="grid gap-1">
                <div className="font-medium">{formRecord.name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {formRecord.email}
                </div>
              </div> 
            </div>   
          </>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="your phone number" {...field}/>
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
                  <Textarea placeholder="Your address" {...field} className="resize-none"  /> 
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
                <Select >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  {countries && (
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country._id} value={country.name}>
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
                key={field.id}  // important to include key with field's id
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
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" size="sm"className="mt-2"onClick={() => append({ value: "" })}>
              Add URL
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
