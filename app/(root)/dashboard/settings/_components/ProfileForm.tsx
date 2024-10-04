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
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Label } from "@/components/ui/label";

const ProfileFormSchema = z.object({
  phoneNumber: z.string({
    required_error: "Please add a phone number to display.",
  }).optional(),
  address: z.string({
    message: "address must be at least 2 characters.",
  }).optional(),
  countryId: z.string({
    required_error: "Please select a country."
  }).optional(),
  socialLinks: z.array(
    z.object({
      value: z.string().url({ message: "Please enter a valid URL." }),
    })
  ).optional()
})

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export default function ProfileForm(props: {
  user: Preloaded<typeof api.users.getCurrentUser>;
  countries: Preloaded<typeof api.countries.getCountries>;
}) {
  const user = usePreloadedQuery(props.user);
  const countries = usePreloadedQuery(props.countries); 

  const {
    mutate,
    pending
  } = useApiMutation(api.users.updateUser); 

  // 1. Define your form and set default values. These values can come from database or API
/*   const defaultValues: Partial<ProfileFormValues> = {
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    countryId: user?.countryId, // default to empty string. Will be filled dynamically when selecting a country.
    socialLinks: user?.socialLinks
  } */

    

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      countryId: user?.countryId ? user.countryId : undefined, // default to empty string. Will be filled dynamically when selecting a country.
      socialLinks: user?.socialLinks
    },
    mode: "onChange"
  })

  console.log("form data: " + JSON.stringify(form));

  const { fields, append } = useFieldArray({
    name: "socialLinks",
    control: form.control
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
      });
      /*  .then(() => {
            toast.success("User updated successfully!")
          })
          .catch((error) => {
            toast.error(
              //{JSON.stringify(data, null, 2)}
            )
          });
      //form.res *///et();
    } catch (error) {
      
    }
  }

  return user && (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <>
            <Label>Full Name</Label>
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
          </>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="your phone number" {...field} defaultValue={field.value} />
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
