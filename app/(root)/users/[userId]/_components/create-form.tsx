"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateFormProps {
  userId: Id<"User">;
}

const CreateFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  countryId: z.string({
    required_error: "Please select a country."
  }),
})

export function ProfileForm({
  userId
}: CreateFormProps) {

/*       const {
        mutate,
        pending
    } = useApiMutation(api.users.add); */
    const countries = useQuery(api.countries.getCountries);
    const user = useQuery(api.users.getUser, { id: userId });

    if (user === undefined) {
      return <div>Loading...</div>
    }


  type CreateFormValues = z.infer<typeof CreateFormSchema>
  // 1. Define your form and set default values. These values can come from database or API
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      countryId: "" // default to empty string. Will be filled dynamically when selecting a country.
    },
    mode: "onChange"
  })

  function handleCountryChange(countryName: string) {
    if (countries === undefined) return;
    const selectedCategory = countries.find(country => country.name === countryName);
}

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
        // You can now use these values for mutation.
/*         mutate({
          gigId: gigId,
          sellerId: sellerId,
          comment: values.comment,
          service_as_described: values.service_as_described, // Parse as integer
          recommend_to_a_friend: values.recommend_to_a_friend, // Parse as integer
          communication_level: values.communication_level, // Parse as integer
      })
          .then(() => {
              // Handle success
          })
          .catch((error) => {
              // Handle error
          });
      form.reset(); */
  }

  return (
    <>
      <div>{user ? "Create User" : "Edit User"}</div>
      <br/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="your full name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />
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
            )} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
