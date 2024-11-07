import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { FileCategoryValidator } from "./helpers";

export const userFields = {
  name: v.string(),
  tokenIdentifier: v.string(),
  pictureUrl: v.optional(v.string()),
  email: v.optional(v.string()),
  phoneNumber: v.optional(v.string()),
  address: v.optional(v.string()),
  countryId: v.optional(v.union(v.id("Country"), v.null())),  
  latitude: v.optional(v.float64()),
  longitude: v.optional(v.float64()),
  socialLinks: v.optional(v.array(v.object({
    value: v.string(),
    isSocialProfile: v.boolean()
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
  achievements: v.optional(v.array(v.object({
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
  storageId: v.id("_storage"),
  uploadedBy: v.optional(v.union(v.id("User"), v.null()))
}

export const skillFields = {
  name: v.string(),
  code: v.optional(v.string()), 
  icon: v.optional(v.string()), 
  createdBy: v.optional(v.union(v.id("User"), v.null()))
}

export const skillLinkFields = {
  parentId: v.id("Skill"),
  childId: v.id("Skill"),
  createdBy: v.optional(v.union(v.id("User"), v.null()))
}

export default defineSchema({
  User: defineTable(userFields)
  .index("idx_user_name", ["name"])
  .index("idx_token", ["tokenIdentifier"])
  .index("idx_country", ["countryId"]),
  Country: defineTable(countryFields)
  .index("idx_country_name", ["name", "iso2", "iso3"]), 
  Occupation: defineTable(occupationFields)
  .index("idx_occupation_title", ["title"])
  .index("idx_company", ["companyId"])
  .index("idx_createdBy", ["createdBy"]),
  Company: defineTable(companyFields)
  .index("idx_company_name", ["name"])
  .index("idx_createdBy", ["createdBy"]), 
  Project: defineTable(projectFields)
  .index("idx_project_name", ["name"])
  .index("idx_company", ["companyId"])
  .index("idx_createdBy", ["createdBy"]),
  File: defineTable(fileFields)
  .index("idx_file_name", ["name"])
  .index("idx_category", ["category"])
  .index("idx_storage", ["storageId"])
  .index("idx_uploadedBy", ["uploadedBy"]), 
  Skill: defineTable(skillFields)
  .index("idx_skill_name", ["name"])
  .index("idx_code", ["code"])
  .index("idx_createdBy", ["createdBy"]),
  SkillLink: defineTable(skillLinkFields)
  .index("idx_parent", ["parentId"])
  .index("idx_child", ["childId"])
  .index("createdBy", ["createdBy"])  
  .index("idx_parent_child", ["parentId", "childId"])// Add indexes as needed for your specific use case.  // Define indexes on the fields that will be frequently queried.  // Indexing can improve query performance.  // Note: Indexes should be
},
{
  schemaValidation: true //Whether Convex should validate at runtime that your documents match your schema.
},);


