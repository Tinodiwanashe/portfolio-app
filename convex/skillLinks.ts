import { Id } from "./_generated/dataModel";
import { query, mutation, QueryCtx  } from "./_generated/server";
import { v } from "convex/values";

    const getSkillbyName = async (ctx: QueryCtx, name: string) => {
        return await ctx.db
        .query("Skill")
        .withIndex("idx_skill_name", (q) =>
            q.eq("name", name))
        .first();


    }

    export const getSkillLinks = query({
    handler: async (ctx) => {
        const SkillLinks = await ctx.db
        .query("SkillLink")
        .order("asc")
        .collect();

        return Promise.all(
            (SkillLinks ?? []).map(async (SkillLink) => {
                // For each user , fetch the `Country` he comes from and
                // insert the name into the `Country name` field.
                const user = await ctx.db.get(SkillLink.createdBy as Id<"User">);
                const parent = await ctx.db.get(SkillLink.parentId as Id<"Skill">);
                const child = await ctx.db.get(SkillLink.childId as Id<"Skill">);
                const UserSkillLink =  {
                SkillLink,
                parent,
                child,
                user: user
                };
                return UserSkillLink;
            }),
        );         
    },
    });

    export const getChildSkills = query({
        args: {parentId: v.id("Skill")},
        handler: async (ctx, args) => {
            const SkillLinks = await ctx.db
            .query("SkillLink")
            .withIndex("idx_parent", (q) =>
                q.eq("parentId", args.parentId))
            .order("asc")
            .collect();
    
            return Promise.all(
                (SkillLinks ?? []).map(async (SkillLink) => {
                    // For each user , fetch the `Country` he comes from and
                    // insert the name into the `Country name` field.
                    return await ctx.db.get(SkillLink.childId as Id<"Skill">);
                })
            );         
        },
    });

    export const getChildSkillsByName = query({
        args: {
            name: v.string(),
            userId: v.id("User") 
        },
        handler: async (ctx, args) => {
            const skill = await getSkillbyName(ctx, args.name);

            const SkillLinks = await ctx.db
            .query("SkillLink")
            .withIndex("idx_parent", (q) =>
                q.eq("parentId", skill?._id as Id<"Skill">))
            .filter((q) => q.eq(q.field("createdBy"), args.userId))
            .order("asc")
            .collect();
    
            return Promise.all(
                (SkillLinks ?? []).map(async (SkillLink) => {
                    // For each user , fetch the `Country` he comes from and
                    // insert the name into the `Country name` field.
                    return await ctx.db.get(SkillLink.childId as Id<"Skill">);
                })
            );         
        },
    });



    export const getSkillLink = query({
        args: {SkillLinkId: v.id("SkillLink") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.SkillLinkId);
        },
    });

    export const createOrUpdateSkillLink = mutation({
        args: { 
            id: v.union(v.id("SkillLink"), v.null()), 
            parentId: v.id("Skill"),
            childId: v.id("Skill")
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
                const SkillLink = await ctx.db.get(args.id);
                await ctx.db.patch(args.id, {
                    parentId: args.parentId,
                    childId: args.childId,
                    createdBy: SkillLink?.createdBy
                }); 
                return SkillLink?._id;
            } else {
                const SkillLinkId = await ctx.db.insert("SkillLink", {
                    parentId: args.parentId,
                    childId: args.childId,
                    createdBy: user._id
                });  
                return SkillLinkId;      
            }
            },
    });

    export const deleteSkillLink= mutation({
    args: { id: v.id("SkillLink") },
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

        const SkillLink = await ctx.db.get(args.id);
        if (!SkillLink) {
            throw new Error("SkillLink not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
    });