import { Id } from "./_generated/dataModel";
import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";
import { WorkExperienceItem } from "./helpers";

    export const getOccupations = query({
        handler: async (ctx) => {
            const occupations = await ctx.db
            .query("Occupation")
            .order("asc")
            .collect();

            return Promise.all(
                occupations.map(async (occupation) => {
                    // For each occupation , fetch the `company` he comes from and
                    const company = await ctx.db.get(occupation.companyId as Id<"Company">);
                    const user = await ctx.db.get(occupation.createdBy as Id<"User">);
                    return {
                        occupation,
                        ...company,
                        user: {
                            userName: user?.name,
                            userEmail: user?.email,
                            userPictureUrl: user?.pictureUrl
                        }
                    } as WorkExperienceItem;
                }),
            );         
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
            id: v.union(v.id("Occupation"), v.null()), 
            title: v.string(),
            startDate: v.optional(v.number()),
            endDate: v.optional(v.number()),
            responsibilities: v.optional(v.array(v.object({
                value: v.string()
            }))),
            achievements: v.optional(v.array(v.object({
                value: v.string()
            }))),            
            companyId: v.union(v.id("Company"), v.null())
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
                const Occupation = await ctx.db.get(args.id);
                await ctx.db.patch(args.id, {
                    title: args.title,
                    startDate: args.startDate,
                    endDate: args.endDate,
                    responsibilities: args.responsibilities,
                    achievements: args.achievements,
                    companyId: args.companyId,
                    createdBy: Occupation?.createdBy
                }); 
                return Occupation?._id;
            } else {
                const OccupationId = await ctx.db.insert("Occupation", {
                    title: args.title,
                    startDate: args.startDate,
                    endDate: args.endDate,
                    responsibilities: args.responsibilities,
                    achievements: args.achievements,
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