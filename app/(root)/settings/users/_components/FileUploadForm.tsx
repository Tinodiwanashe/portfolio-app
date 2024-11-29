"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FileSchema, FileFormValues} from "@/app/types/definitions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ACCEPTED_FILE_MIMETYPES, arrCategory } from "@/app/types/constants";
import React from 'react'

export default function FileUploadForm() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const mutate = useMutation(api.files.createFileLink);
  const category = arrCategory;

  // 1. Define your form.
  const form = useForm<FileFormValues>({
    resolver: zodResolver(FileSchema)
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: FileFormValues) => {
    const result = FileSchema.safeParse(values);
    if (!result.success) {
      toast.error("Invalid fields: " + JSON.stringify(result.error.flatten().fieldErrors, null, 2));
      return;
    }

    try {
      // Step 1: Get a short-lived upload URL
      const url = await generateUploadUrl();
      // Step 2: POST the file to the URL
      //const result = await uploadFile(url,values.file, values.file.type);
      //Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
      });
      const { storageId } = await result.json();
      // Step 3: Save the newly allocated storage id to the database
      await mutate({
          name: values.file.name,
          category: values?.category || "Resume",
          storageId: storageId
      }).then(() => {
        toast.success(` File uploaded successfully!`)
      })
      .catch((error) => {
        toast.error("Failed to upload the file: ", error);
      });
      form.reset();
    } catch (error) {
      toast.error("File upload failed: " + JSON.stringify(error, null, 2));
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  {category && (
                    <SelectContent>
                      {category.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
                <FormDescription>
                  Select a category most relevant to the file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps  } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input 
                  {...fieldProps}
                  type="file"
                  placeholder="Upload a file..."
                  accept={ACCEPTED_FILE_MIMETYPES}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(event.target.files && file);
                  }}

                />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
            <Button type="submit">Upload</Button>
        </DialogFooter>
      </form>
    </Form>

  );
}