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
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface CreateFormProps {
  userId: Id<"User">;
}

const ProfileFormSchema = z.object({
  phoneNumber: z.string({
    required_error: "Please add a phone number to display.",
  }).optional(),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  countryId: z.string({
    required_error: "Please select a country."
  }),
  socialLinks: z.array(
    z.object({
      value: z.string().url({ message: "Please enter a valid URL." }),
    })
  ).optional()
})

type ProfileFormValues = z.infer<typeof ProfileFormSchema>



export function ProfileForm() {

    const {
      mutate,
      pending
    } = useApiMutation(api.users.updateUser); 
    const countries = useQuery(api.countries.getCountries);
    const user = useQuery(api.users.getCurrentUser);

    if (user === undefined) {
      return <div>Loading...</div>
    }

    // This can come from your database or API.
    const defaultValues: Partial<ProfileFormValues> = {
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      countryId: user?.countryId?.toString(), // default to empty string. Will be filled dynamically when selecting a country.
      socialLinks: user?.socialLinks
    }

  // 1. Define your form and set default values. These values can come from database or API
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
    mode: "onChange"
  })

  const { fields, append } = useFieldArray({
    name: "socialLinks",
    control: form.control
  })

  async function handleCountryChange(countryName: string) {
    if (countries === undefined) return;
    const selectedCategory = countries.find(country => country.name === countryName);
}

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
            toast.success(
              <>
                <span>User updated successfully! </span>,
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
              </>
            )
          })
          .catch((error) => {
            toast.error(
              <>
                <span>Something is wrong! </span>
                <div>{error}</div>
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
              </>
            )
          });
      //form.reset();
  }

  return (
    <>
      <div>{user ? "Create User" : "Edit User"}</div>
      <br/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
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
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Textarea placeholder="your address" {...field} />
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
                <Select
                  onValueChange={(countryName: string) => {
                    field.onChange(countryName)
                    handleCountryChange(countryName)
                  } }
                  defaultValue={field.value}
                >
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
