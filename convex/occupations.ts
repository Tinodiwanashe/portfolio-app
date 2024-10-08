import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";


    export const getOccupations = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db
        .query("Occupation")
        .order("asc")
        .collect();
        },
    });

    export const getOccupation = query({
        args: {OccupationId: v.id("Occupation") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.OccupationId);
        },
    });

    export const createOrUpdateOccupation = mutation({
        args: { 
            id: v.id("Occupation"), 
            title: v.string(),
            startDate: v.optional(v.string()),
            endDate: v.optional(v.string()),
            responsibilities: v.optional(v.array(v.string())),
            companyId: v.union(v.id("Company"), v.null()),
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

            const Occupation = await ctx.db.get(args.id);
            if (Occupation) {
                await ctx.db.patch(args.id, {
                    title: args.title,
                    startDate: args.startDate,
                    endDate: args.endDate,
                    responsibilities: args.responsibilities,
                    companyId: args.companyId,
                    createdBy: args.createdBy
                }); 
                return Occupation._id;
            } else {
                const OccupationId = await ctx.db.insert("Occupation", {
                    title: args.title,
                    startDate: args.startDate,
                    endDate: args.endDate,
                    responsibilities: args.responsibilities,
                    companyId: args.companyId,
                    createdBy: user._id
                });  
                return OccupationId;      
            }
            },
    });

    export const deleteOccupation= mutation({
    args: { id: v.id("Occupation") },
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

        const Occupation = await ctx.db.get(args.id);
        if (!Occupation) {
            throw new Error("Occupation not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
    });