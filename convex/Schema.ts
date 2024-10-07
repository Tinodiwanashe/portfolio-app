import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define a messages table with two indexes.
/* Each table is defined using the defineTable function. Within each table, the document type is defined using the validator builder, v. 
In addition to the fields listed, Convex will also automatically add _id and _creationTime fields.  */

export default defineSchema({
  SocialMediaLink: defineTable({
    name: v.string(),
    url: v.optional(v.string()),
    createdBy: v.union(v.id("User"), v.null())
  }).index("idx_social_name", ["name", "createdBy"]).index("createdBy", ["createdBy"]),
  User: defineTable({
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
  }).index("idx_user_name", ["name"]).index("idx_token", ["tokenIdentifier"]).index("countryId", ["countryId"]),
  Country: defineTable({
    name: v.string(),
    iso2: v.optional(v.string()),
    iso3: v.optional(v.string()),
    local_name: v.optional(v.string()),
    continent: v.optional(v.string())
  }).index("idx_country_name", ["name", "iso2", "iso3"]), 
  Occupation: defineTable({
    title: v.string(),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    companyId: v.union(v.id("Company"), v.null()),
    createdBy: v.union(v.id("User"), v.null())
  }).index("idx_occupation_title", ["title"]).index("createdBy", ["createdBy"]).index("companyId", ["companyId"]),
  Company: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    createdBy: v.union(v.id("User"), v.null())
  }).index("idx_company_name", ["name"]).index("createdBy", ["createdBy"]), 
  Project: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    companyId: v.union(v.id("Company"), v.null())
  }).index("idx_project_name", ["name"]).index("companyId", ["companyId"])  
});
