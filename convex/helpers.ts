import { Infer, v } from "convex/values";
import { Doc } from "./_generated/dataModel";

// Define a messages table with two indexes.
/* Each table is defined using the defineTable function. Within each table, the document type is defined using the validator builder, v. 
In addition to the fields listed, Convex will also automatically add _id and _creationTime fields.  */
export const FileCategorySchema = v.union(
    v.literal("Resume"),
    v.literal("Image"),
    v.literal("Video")
  );

// The corresponding type can be used in server or client-side helpers:
// export type FileCategoryObject = Infer<typeof FileCategorySchema>;
export type FileCategory = Infer<typeof FileCategorySchema>;
// is inferred as `'Resume' | 'Image' | 'Video'`

type userInfo = {
  userName: string;
  userEmail: string;
  userPictureUrl: string;
};

export const TextSchema = v.object({
  value: v.string()
});

export type TextObject = Infer<typeof TextSchema>;

export const SocialLinkSchema = v.object({
  value: v.string(),
  isSocialProfile: v.union(v.boolean(),v.boolean())
})

export type SocialLinkObject = Infer<typeof SocialLinkSchema>;

export type User = Doc<"User">;

export type Occupation = Doc<"Occupation">;

export type Country = Doc<"Country">;

export type Company = Doc<"Company">;

export type Skill = Doc<"Skill">;

export type UserWithCountry = {
  user: Doc<"User">,
  country: Doc<"Country">
};

export type CompanyWithOccupation = Doc<"Company"> & {
  company: Doc<"Occupation">,
  user: Doc<"User">
};

export type UserSkill = Doc<"Skill"> & {
  user: userInfo,
  linkedSkills: []
};

export type CompanyWithUser = Doc<"Company"> & {
  company: Doc<"User">
};

export type CompanyWithProject = {
  project: Doc<"Project">,
  company: Doc<"Company">,
  user: Doc<"User">
};

export type WorkExperienceItem = {
  occupation: Doc<"Occupation">,
  company: Doc<"Company">,
  user?: userInfo
};

export type FileItem = {
  file: Doc<"File">,
  user: Doc<"User">,
  url?: string | null
};


