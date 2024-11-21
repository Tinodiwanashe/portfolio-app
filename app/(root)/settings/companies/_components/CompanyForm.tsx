"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { CompanyFormSchema, CompanyFormValues } from "@/app/types/definitions";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { redirectToURL } from "@/utils/actions/miscellaneous ";

type PreloadedProps = {
  preloadedCompany: Preloaded<typeof api.companies.getCompany>;
}

export default function CompanyForm(props: PreloadedProps) {  
  const company = usePreloadedQuery(props.preloadedCompany);
    
  const {
    mutate,
    isPending
  } = useApiMutation(api.companies.createOrUpdateCompany); 
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<CompanyFormValues> = {
    name: company?.name,
    description: company?.description,
    url: company?.url
  } 

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
    mode: "onChange"
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: CompanyFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = CompanyFormSchema.safeParse(values);
    if (!result.success) {
      toast.error("Invalid fields: " + JSON.stringify(result.error.flatten().fieldErrors, null, 2));
      return;
    }

    try {
      mutate({
        id: company?._id,
        name: values.name,
        description: values.description,
        url: values.url      
      }).then(() => {
            toast.success("Company updated successfully!");
            redirectToURL(`/settings/companies`);
          })
          .catch((error) => {
            toast.error("Failed to update the Company: ", error);
          });
    } catch (error) {
      toast.error("Failed to update the Company: " + JSON.stringify(error, null, 2));      
    }
  }

  return company && (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your Company name" {...field}/>
                </FormControl>
                <FormDescription>
                  This is company name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => ( 
              <FormItem>
                <FormLabel id="description">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Company description" {...field} className="resize-none"  /> 
                </FormControl>
                <FormDescription>
                  This is your Company description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder="your Company url" {...field}/>
                </FormControl>
                <FormDescription>
                  This is your Company url.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
