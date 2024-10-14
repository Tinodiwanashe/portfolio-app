import { defineSchema, defineTable } from "convex/server";
import { v, Infer } from "convex/values";

// Define a messages table with two indexes.
/* Each table is defined using the defineTable function. Within each table, the document type is defined using the validator builder, v. 
In addition to the fields listed, Convex will also automatically add _id and _creationTime fields.  */
export const FileCategoryValidator = v.union(
  v.literal("Resume"),
  v.literal("Image"),
  v.literal("Video")
);

export type FileCategory = Infer<typeof FileCategoryValidator>;

export const userFields = {
  name: v.string(),
  tokenIdentifier: v.string(),
  pictureUrl: v.optional(v.string()),
  email: v.optional(v.string()),
  phoneNumber: v.optional(v.string()),
  address: v.optional(v.string()),
  countryId: v.optional(v.union(v.id("Country"), v.null())),  
  socialLinks: v.optional(v.array(v.object({
    value: v.string()
  })))
}

export const countryFields = {
  name: v.string(),
  iso2: v.optional(v.string()),
  iso3: v.optional(v.string()),
  local_name: v.optional(v.string()),
  continent: v.optional(v.string())
}

export const occupationFields = {
  title: v.string(),
  startDate: v.optional(v.number()),
  endDate: v.optional(v.number()),
  responsibilities: v.optional(v.array(v.object({
    value: v.string()
  }))),
  companyId: v.optional(v.union(v.id("Company"), v.null())),
  createdBy: v.union(v.id("User"), v.null())
}

export const companyFields = {
  name: v.string(),
  description: v.optional(v.string()),
  url: v.optional(v.string()),
  createdBy: v.optional(v.union(v.id("User"), v.null()))
}

export const projectFields = {
  name: v.string(),
  description: v.optional(v.string()),
  responsibilities: v.optional(v.array(v.object({
    value: v.string()
  }))),
  skills: v.optional(v.array(v.object({
    value: v.string()
  }))),
  companyId: v.optional(v.union(v.id("Company"), v.null())),
  createdBy: v.union(v.id("User"), v.null())
}

export const fileFields = {
  name: v.string(),
  category: FileCategoryValidator,
  tokenIdentifier: v.optional(v.string()),
  storageId: v.id("_storage")
}

export default defineSchema({
  User: defineTable(userFields).index("idx_user_name", ["name"]).index("idx_token", ["tokenIdentifier"]).index("countryId", ["countryId"]),
  Country: defineTable(countryFields).index("idx_country_name", ["name", "iso2", "iso3"]), 
  Occupation: defineTable(occupationFields).index("idx_occupation_title", ["title"]).index("createdBy", ["createdBy"]).index("companyId", ["companyId"]),
  Company: defineTable(companyFields).index("idx_company_name", ["name"]).index("createdBy", ["createdBy"]), 
  Project: defineTable(projectFields).index("idx_project_name", ["name"]).index("companyId", ["companyId"]),
  File: defineTable(fileFields).index("idx_file_name", ["name"]).index("idx_token", ["tokenIdentifier"]).index("idx_category", ["category"]) 
});
