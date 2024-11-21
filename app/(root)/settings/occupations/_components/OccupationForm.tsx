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
import { OccupationFormSchema, OccupationFormValues } from "@/app/types/definitions";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { redirectToURL } from "@/utils/actions/miscellaneous ";
import { FaTrash } from "react-icons/fa6";

type PreloadedProps = {
  preloadedOccupation: Preloaded<typeof api.occupations.getOccupation>;
  preloadedCompanies: Preloaded<typeof api.companies.getCompanies>;
}

export default function OccupationForm(props: PreloadedProps) {  
  const occupation = usePreloadedQuery(props.preloadedOccupation);
  const companies = usePreloadedQuery(props.preloadedCompanies);
    
  const {
    mutate,
    isPending
  } = useApiMutation(api.occupations.createOrUpdateOccupation); 
  
  const defaultValues: Partial<OccupationFormValues> = {
    title: occupation?.title,
    startDate: new Date(occupation?.startDate || Date.now()),
    endDate: new Date(occupation?.endDate || Date.now()),
    responsibilities:occupation?.responsibilities,
    achievements: occupation?.achievements,
    companyId: occupation?.companyId || ""
  }   
    console.log("defaultValues: ", defaultValues);
    
    // useForm is a custom hook for managing forms with ease. It takes one object as optional argument
  const form = useForm<OccupationFormValues>({
    resolver: zodResolver(OccupationFormSchema), //Integrates with your preferred schema validation library.
    defaultValues, //	Default values for the form.
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
    mode: "onChange" //	Validation strategy before submitting behaviour.
  })


  const faResponsibilities = useFieldArray({
    name: "responsibilities", // unique name for your Field Array
    control: form.control // control props comes from useForm (optional: if you are using FormContext)
  });

  const faAchievements = useFieldArray({
    name: "achievements", // unique name for your Field Array
    control: form.control // control props comes from useForm (optional: if you are using FormContext)
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: OccupationFormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
    console.log(values)

      // You can now use these values for mutation.
      mutate({
        id: occupation?._id,
        title: values?.title,
        startDate: new Date(values?.startDate).getTime(),
        endDate: new Date(values?.endDate).getTime(),
        responsibilities: values?.responsibilities,
        achievements: values?.achievements,
        companyId: values?.companyId     
      }).then(() => {
            toast.success("Occupation updated successfully!");
            redirectToURL(`/settings/occupations`);
          })
          .catch((error) => {
            toast.error("Failed to update the occupation: ", error);
          });
      //form.reset();
    } catch (error) {
      
    }
  }

  return occupation && (
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
                  <Input placeholder="your Occupation title" {...field}/>
                </FormControl>
                <FormDescription>
                  This is your Occupation title.
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
          <div className="responsibilities">
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
                      Add responsibilities to your occupation.
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
          <div className="achievements">
            {faAchievements.fields.map((field,index) => (
              <FormField
                control={form.control}
                key={field.id}  // important to include key with field's id
                name={`achievements.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Achievements
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add achievements to your occupation.
                    </FormDescription>
                    <div className="flex  flex-row gap-3 flex-wrap">
                      <FormControl className="flex-1">
                        <Input {...field}/>
                      </FormControl>
                      <Button size="icon" variant="outline" onClick={() => faAchievements.remove(index)}>
                          <FaTrash className="h-[1.2rem] w-[1.2rem]" />
                      </Button>                    
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" size="sm"className="mt-2"onClick={() => faAchievements.append({ value: "" })}>
              Add Achievement
            </Button>
          </div>          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
