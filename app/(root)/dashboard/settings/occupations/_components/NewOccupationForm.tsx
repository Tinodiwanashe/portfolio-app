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
import { Doc, Id } from "@/convex/_generated/dataModel";
import { OccupationFormSchema, OccupationFormValues } from "@/app/types/definitions";
import { useQuery } from "convex/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Editor from "@/components/editor/editor";
import ErrorDetail from "@/components/ErrorDetail";

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

export default function NewOccupationForm() {  
  const companies = useQuery(api.companies.getCompanies);
    
  const {
    mutate,
    isPending
  } = useApiMutation(api.occupations.createOrUpdateOccupation);
  const router = useRouter(); 
  
  // 1. Define your form and set default values. These values can come from database or API
  const defaultValues: Partial<OccupationFormValues> = {
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    responsibilities: [],
    companyId: undefined
  } 

  const form = useForm<OccupationFormValues>({
    resolver: zodResolver(OccupationFormSchema), //Integrates with your preferred schema validation library.
    defaultValues,   
    mode: "onChange"
  })

  //form.setValue("phoneNumber", formRecord?.phoneNumber);
  //form.setValue("address", formRecord?.address);
  //form.setValue("countryId", formRecord?.countryId?.toString()); 

  const { append, fields } = useFieldArray({
    name: "responsibilities", // unique name for your Field Array
    control: form.control // control props comes from useForm (optional: if you are using FormContext)
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: OccupationFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
    console.log(values)

      // You can now use these values for mutation.
      mutate({
        id: null,
        title: values?.title,
        startDate: new Date(values?.startDate).getTime(),
        endDate: new Date(values?.endDate).getTime(),
        responsibilities: values?.responsibilities,
        companyId: values?.companyId     
      }).then(() => {
            toast.success("Occupation updated successfully!");
            router.push(`/dashboard/settings/occupations`)
          })
          .catch((error) => {
            toast.error(
              <ErrorDetail entity="Occupation" error={error} jsonString={JSON.stringify(values, null, 2)}/>
            )
          });
      //form.reset();
    } catch (error) {
      
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your Occupation title" {...field}/>
                </FormControl>
                <FormDescription>
                  This is your Occupation Title.
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
                <Select {...field} value={field.value || ""} onValueChange={field.onChange}>
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
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => ( 
              <FormItem>
                <FormLabel id="startDate">Started On</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? 
                          (format(field.value, "PPP")) 
                          : (<span>Pick a start date</span>)
                        }
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is your start date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => ( 
              <FormItem>
                <FormLabel id="endDate">Ended On</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? 
                          (format(field.value, "PPP")) 
                          : (<span>Pick an end date</span>)
                        }
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is your end date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />    
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Editor initialValue={defaultValue} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This is your Occupation Title.
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
                name={`responsibilities.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Responsibilities
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add responsibilities to your occupation.
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
              Add Responsibility
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
