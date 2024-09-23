import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";


    export const getSocialMediaLinks = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db
        .query("SocialMediaLink")
        .order("asc")
        .collect();
        },
    });

    export const getSocialMediaLink = query({
        args: {SocialMediaLinkId: v.id("SocialMediaLink") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.SocialMediaLinkId);
        },
    });

    export const createOrUpdateSocialMediaLink = mutation({
        args: { id: v.id("SocialMediaLink"), name: v.string(), url: v.optional(v.string()) },
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

            const socialMediaLink = await ctx.db.get(args.id);
            if (socialMediaLink) {
                await ctx.db.patch(args.id, {
                    name: args.name,
                    url: args.url,
                }); 
                return socialMediaLink._id;
            } else {
                const socialMediaLinkId = await ctx.db.insert("SocialMediaLink", {
                    name: args.name,
                    url: args.url,
                    createdBy: user._id
                });  
                return socialMediaLinkId;      
            }
            },
    });

    export const deleteSocialMediaLink = mutation({
    args: { id: v.id("SocialMediaLink") },
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

        const socialMediaLink = await ctx.db.get(args.id);
        if (!socialMediaLink) {
            throw new Error("Social Media Link not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
    });