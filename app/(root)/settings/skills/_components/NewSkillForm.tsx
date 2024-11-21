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
import { SkillFormSchema, SkillFormValues } from "@/app/types/definitions";
import { useQuery } from "convex/react";
import { redirectToURL } from "@/utils/actions/miscellaneous ";

export default function NewSkillForm() {  
    
  const {
    mutate,
    isPending
  } = useApiMutation(api.skills.createOrUpdateSkill); 
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<SkillFormValues> = {
    name: "",
    code: ""
  } 

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(SkillFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,  // will get updated once values returns - will get updated when values props updates    
    mode: "onChange"
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: SkillFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = SkillFormSchema.safeParse(values);
    if (!result.success) {
      toast.error("Invalid fields: " + JSON.stringify(result.error.flatten().fieldErrors, null, 2));
      return;
    }

    try {
      // You can now use these values for mutation.
      mutate({
        id: null,
        name: values.name,
        code: values.code  
      }).then(() => {
            toast.success("Skill created successfully!");
            redirectToURL(`/settings/skills`);
          })
          .catch((error) => {
            toast.error("Failed to create the Skill: ", error);
          });
      form.reset();
    } catch (error) {
      toast.error("Failed to create the Skill: " + JSON.stringify(error, null, 2));   
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
                  <Input placeholder="your Skill name" {...field}/>
                </FormControl>
                <FormDescription>
                  This is skill name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => ( 
              <FormItem>
                <FormLabel id="code">Code</FormLabel>
                <FormControl>
                  <Textarea placeholder="Skill code" {...field} className="resize-none"  /> 
                </FormControl>
                <FormDescription>
                  This is your Skill code.
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
