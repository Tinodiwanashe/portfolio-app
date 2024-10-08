import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";


    export const getCompanies = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db
        .query("Company")
        .order("asc")
        .collect();
        },
    });

    export const getCompany = query({
        args: {CompanyId: v.id("Company") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.CompanyId);
        },
    });

    export const createOrUpdateCompany = mutation({
        args: { 
            id: v.id("Company"), 
            name: v.string(),
            description: v.optional(v.string()),
            url: v.optional(v.string()),
            createdBy: v.union(v.id("User"), v.null())
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

            const Company = await ctx.db.get(args.id);
            if (Company) {
                await ctx.db.patch(args.id, {
                    name: args.name,
                    description: args.description,
                    url: args.url,
                    createdBy: args.createdBy
                }); 
                return Company._id;
            } else {
                const CompanyId = await ctx.db.insert("Company", {
                    name: args.name,
                    description: args.description,
                    url: args.url,
                    createdBy: args.createdBy
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