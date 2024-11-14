"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { SkillLinkFormSchema, SkillLinkFormValues } from "@/app/types/definitions";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { redirectToURL } from "@/utils/actions/miscellaneous ";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/convex/helpers";

type PreloadedProps = {
  parentId: Id<"Skill">;
  /* preloadedSkills: Preloaded<typeof api.skills.getOtherSkills>; */
}

export default function NewSkillLinkForm(props: PreloadedProps) {  
  const skills = useQuery(api.skills.getOtherSkills,{id: props.parentId});  
  const parentSkill = useQuery(api.skills.getSkill,{SkillId: props.parentId});  
  const childSkills = useQuery(api.skillLinks.getChildSkills,{parentId: props.parentId}); 
  const {
    mutate,
    isPending
  } = useApiMutation(api.skillLinks.createOrUpdateSkillLink); 
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<SkillLinkFormValues> = {
    childId: ""
  } 

  const form = useForm<SkillLinkFormValues>({
    resolver: zodResolver(SkillLinkFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,  // will get updated once values returns - will get updated when values props updates    
    mode: "onChange"
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: SkillLinkFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = SkillLinkFormSchema.safeParse(values);
    if (!result.success) {
      toast.error("Invalid fields: " + JSON.stringify(result.error.flatten().fieldErrors, null, 2));
      return;
    }

    try {
      // You can now use these values for mutation.
      mutate({
        id: null,
        parentId: props.parentId,
        childId: values.childId  
      }).then(() => {
            toast.success("SkillLink created successfully!");
            redirectToURL(`/settings/skills`);
          })
          .catch((error) => {
            toast.error("Failed to create the Skill: ", error);
          });
      form.reset();
    } catch (error) {
      toast.error("Failed to create the SkillLink: " + JSON.stringify(error, null, 2));   
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="childId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Skill" />
                    </SelectTrigger>
                  </FormControl>
                  {skills && (
                    <SelectContent>
                      {skills.map((item: Skill, index: number) => (
                        <SelectItem key={index} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
                <FormDescription>
                  Select a skill most relevant to the Skill {parentSkill?.name}.
                  <div className="mt-4 flex flex-row gap-2">
                    {(childSkills ?? []).map((item, index) =>(
                      <Badge 
                        variant="default"
                        className="align-middle"
                        key={index}
                      >
                        {item?.name}
                      </Badge>
                    ))}
                  </div>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />           
          <DialogFooter>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">
                  Close
                  </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
          </DialogFooter>
          </form>
      </Form>
    </>
  )
}
