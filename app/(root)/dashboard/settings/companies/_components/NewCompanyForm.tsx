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
import { useQuery } from "convex/react";

export default function NewCompanyForm() {  
    
  const {
    mutate,
    isPending
  } = useApiMutation(api.companies.createOrUpdateCompany); 
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<CompanyFormValues> = {
    name: "",
    description: "",
    url: ""
  } 

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,  // will get updated once values returns - will get updated when values props updates    
    mode: "onChange"
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: CompanyFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
    console.log(values)

      // You can now use these values for mutation.
      mutate({
        id: null,
        name: values.name,
        description: values.description,
        url: values.url      
      }).then(() => {
            toast.success("Company updated successfully!")
          })
          .catch((error) => {
            toast.error(
              <>
                <span>Failed to update</span>
                <i className="my-2 p-4">{error}</i>

                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>              
              </>              
            )
          });
      form.reset();
    } catch (error) {
      
    }
  }

  return (
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
                  This is the Company name.
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
