// This file is not used in the demo app.
// It showcases only the code related to file uploading.

import { FormEvent, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { uploadFile } from "@/utils/actions/fileUpload";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
//import { Input } from "postcss";
import { Button } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024);
    return +result.toFixed(decimalsNum);
};

const arrCategory = ["Resume", "Image", "Video"] as const; //  use as const to define your enum values as a tuple of strings


const fileInstance = z.instanceof(File, { message: "Please upload a file" });
const formSchema = z.object({
    category: z.enum(arrCategory), //a Zod-native way to declare a schema with a fixed set of allowable string values.
    file_: fileInstance
        .refine(file => file.size <= MAX_FILE_SIZE, {
            message: 'File size should be less than 5MB',
        })
        .refine(file => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: 'Only .pdf and .docx formats are supported',
        })
})


  type FormValues = z.infer<typeof formSchema>;

export default function App() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const mutate = useMutation(api.files.createFileLink);

  // 1. Define your form.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  const fileRef = form.register("file_");

  // 2. Define a submit handler.
  const onSubmit = async (values: FormValues) => {

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await uploadFile(postUrl,values.file_, values.file_.type);
    // Step 3: Save the newly allocated storage id to the database
    await mutate({
        tokenIdentifier: "",
        name: values.file_.name,
        category: values.category,
        storageId: result.storageId
    });

  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="file_"
        render={({ field }) => (
          <FormItem>
            <FormLabel>File</FormLabel>
            <FormControl>
              <Input 
                type="file"
                placeholder="Upload a file..."
                {...fileRef}
              />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>

  );
}