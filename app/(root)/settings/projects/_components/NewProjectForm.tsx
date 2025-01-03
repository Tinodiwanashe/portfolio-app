"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { ProjectFormSchema, ProjectFormValues } from "@/app/types/definitions";
import { useQuery } from "convex/react";
import { Textarea } from "@/components/ui/textarea";
import { FaTrash } from "react-icons/fa6";
import { redirectToURL } from "@/utils/actions/miscellaneous ";
import React from 'react';

export default function NewProjectForm() {  
  const companies = useQuery(api.companies.getCompanies);
    
  const createOrUpdateProject = useApiMutation(api.projects.createOrUpdateProject);
  
  // 1. Define your form and set default values. These values can come from database or API
  const formRecord: Partial<ProjectFormValues> = {
    name: "",
    description: "",
    responsibilities: [],
    companyId: undefined
  } 

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema), //Integrates with your preferred schema validation library.
    defaultValues: formRecord,   
    mode: "onChange"
  })

  const faResponsibilities = useFieldArray({
    name: "responsibilities", // unique name for your Field Array
    control: form.control // control props comes from useForm (optional: if you are using FormContext)
  });

  const faSkills = useFieldArray({
    name: "skills", // unique name for your Field Array
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    rules: {
      required: "Please append atleast 1 skill."
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: ProjectFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
      // You can now use these values for mutation.
      const result = ProjectFormSchema.safeParse(data);
      if (result.success) {
        createOrUpdateProject.mutate({
          id: null,
          name: data?.name,
          description: data?.description,
          responsibilities: data?.responsibilities,
          skills: data?.skills,
          companyId: data?.companyId || null    
        })
        .then(() => {
          toast.success("Project created successfully!");
          redirectToURL(`/settings/projects`);
        })
        .catch((error) => {
          toast.error(
            "Failed to create project: ", error.message          
          )
        })
        form.reset();
      } else {
        console.log("Validation errors:", result.error.errors);
        toast.warning(
          "Seems like you have some invalid fields"          
        )
      }
  }

  return formRecord && (
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
                  <Input placeholder="Your Project name" {...field}/>
                </FormControl>
                <FormDescription>
                  This is your Project name.
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your Project description" {...field}/>
                </FormControl>
                <FormDescription>
                  This is your Project description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />          
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  {companies && (
                    <SelectContent>
                      {companies.map((record) => (
                        <SelectItem key={record.company._id} value={record.company._id}>
                          {record.company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
                <FormDescription>
                  Select a company most relevant to the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />                           
          <div id="Responsibilities">
            {faResponsibilities.fields.map((field,index) => (
              <FormField
                control={form.control}
                key={field.id}  // important to include key with field's id
                name={`responsibilities.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Responsibilities
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add responsibilities to your Project.
                    </FormDescription>
                    <div className="flex  flex-row gap-3 flex-wrap">
                      <FormControl className="flex-1">
                        <Input {...field}/>
                      </FormControl>
                      <Button size="icon" variant="outline" onClick={() => faResponsibilities.remove(index)}>
                          <FaTrash className="h-[1.2rem] w-[1.2rem]" />
                      </Button>                    
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" size="sm"className="mt-2"onClick={() => faResponsibilities.append({ value: "" })}>
              Add Responsibility
            </Button>
          </div>
          <div id="Skills">
            {faSkills.fields.map((field,index) => (
              <FormField
                control={form.control}
                key={field.id}  // important to include key with field's id
                name={`skills.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Skills
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add skills to applied in your Project.
                    </FormDescription>
                    <div className="flex  flex-row gap-3 flex-wrap">
                      <FormControl className="flex-1">
                        <Input {...field}/>
                      </FormControl>
                      <Button size="icon" variant="outline" onClick={() => faSkills.remove(index)}>
                          <FaTrash className="h-[1.2rem] w-[1.2rem]" />
                      </Button>                    
                    </div>
                    <FormMessage />                     
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" size="sm"className="mt-2"onClick={() => faSkills.append({ value: "" })}>
              Add Skill
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
