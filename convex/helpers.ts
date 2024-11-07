import { Infer, v } from "convex/values";
import { Doc } from "./_generated/dataModel";

// Define a messages table with two indexes.
/* Each table is defined using the defineTable function. Within each table, the document type is defined using the validator builder, v. 
In addition to the fields listed, Convex will also automatically add _id and _creationTime fields.  */
export const FileCategoryValidator = v.union(
    v.literal("Resume"),
    v.literal("Image"),
    v.literal("Video")
  );

// The corresponding type can be used in server or client-side helpers:
// export type FileCategoryObject = Infer<typeof FileCategorySchema>;
export type FileCategory = Infer<typeof FileCategoryValidator>;
// is inferred as `'Resume' | 'Image' | 'Video'`


