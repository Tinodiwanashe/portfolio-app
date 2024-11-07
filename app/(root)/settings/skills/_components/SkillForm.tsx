"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { SkillFormSchema, SkillFormValues } from "@/app/types/definitions";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { redirectToURL } from "@/utils/actions/miscellaneous ";
import { useState } from "react";
import Editor from "@/components/editor/Tiptap";

type PreloadedProps = {
  preloadedSkill: Preloaded<typeof api.skills.getSkill>;
}

export default function SkillForm(props: PreloadedProps) {  
  const skill =  usePreloadedQuery(props.preloadedSkill);//useQuery(api.skills.getSkill,{SkillId: id});
  const {
    mutate,
    isPending
  } = useApiMutation(api.skills.createOrUpdateSkill); 
  const [content, setContent] = useState(null);
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<SkillFormValues> = {
    name: skill?.name,
    code: skill?.code,
    icon: skill?.icon
  } 

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(SkillFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
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
      mutate({
        id: skill?._id,
        name: values.name,
        code: values.code,
        icon: values.icon     
      }).then(() => {
            toast.success("Skill updated successfully!");
            redirectToURL(`/settings/skills`);
          })
          .catch((error) => {
            toast.error("Failed to update the Skill: ", error);
          });
    } catch (error) {
      toast.error("Failed to update the Skill: " + JSON.stringify(error, null, 2));      
    }
  }

  return skill && (
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
                  <Input placeholder="Skill code" {...field} className="resize-none"  /> 
                </FormControl>
                <FormDescription>
                  This is your Skill code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />      
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => ( 
              <FormItem>
                <FormLabel id="icon">Icon</FormLabel>
                <FormControl>
                  <Editor 
                   ref={field.ref}
                    content={field.value || ""}  
                    onDataChange={(html: string) => {
/*                       field.onChange
                      console.log("New Value: ", html)
                      console.log("Old Value: ", field.value) */
                      form.setValue("icon", html);//+
                    }} 
                    disabled={field.disabled || false} 
                  />
                </FormControl>
                <FormDescription>
                  This is your Skill icon.
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
