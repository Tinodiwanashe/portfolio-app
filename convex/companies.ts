import { Id } from "./_generated/dataModel";
import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";


    export const getCompanies = query({
    args: {},
    handler: async (ctx, args) => {
        const companies = await ctx.db
        .query("Company")
        .order("asc")
        .collect();

        return Promise.all(
            companies.map(async (company) => {
              // For each user , fetch the `Country` he comes from and
              // insert the name into the `Country name` field.
              const user = await ctx.db.get(company.createdBy as Id<"User">);
              const CompanyWithUser =  {
                company: company,
                user: user
              };
              return CompanyWithUser;
            }),
        );         
    },
    });

    export const getCompany = query({
        args: {CompanyId: v.union(v.id("Company"), v.null())},
        handler: async (ctx, args) => {
            //return await ctx.db.get(args.CompanyId);
            return await ctx.db
            .query("Company")
            .filter((q) => q.eq(q.field("_id"), args.CompanyId))
            .first();
        },
    });

    export const createOrUpdateCompany = mutation({
        args: { 
            id: v.union(v.id("Company"), v.null()), 
            name: v.string(),
            description: v.optional(v.string()),
            url: v.optional(v.string())
        },
        handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
                throw new Error("Unauthenticated call to mutation");
            }

            const user = await ctx.db
            .query("User")
            .withIndex("idx_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
            if (!user) {
                throw new Error("Unauthenticated call to mutation");
            }

            
            if (args.id !== null) {
                const Company = await ctx.db.get(args.id);
                await ctx.db.patch(args.id, {
                    name: args.name,
                    description: args.description,
                    url: args.url,
                    createdBy: Company?.createdBy
                }); 
                return Company?._id;
            } else {
                const CompanyId = await ctx.db.insert("Company", {
                    name: args.name,
                    description: args.description,
                    url: args.url,
                    createdBy: user._id
                });  
                return CompanyId;      
            }
            },
    });

    export const deleteCompany= mutation({
    args: { id: v.id("Company") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated call to mutation");
        }

        const user = await ctx.db
        .query("User")
        .withIndex("idx_token", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier),
        )
        .unique();
        if (!user) {
            throw new Error("Unauthenticated call to mutation");
        }

        const Company = await ctx.db.get(args.id);
        if (!Company) {
            throw new Error("Company not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
    });