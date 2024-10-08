import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";


    export const getProjects = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db
        .query("Project")
        .order("asc")
        .collect();
        },
    });

    export const getProject = query({
        args: {ProjectId: v.id("Project") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.ProjectId);
        },
    });

    export const createOrUpdateProject = mutation({
        args: { 
            id: v.id("Project"), 
            name: v.string(),
            description: v.optional(v.string()),
            responsibilities: v.optional(v.array(v.string())),
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

            const Project = await ctx.db.get(args.id);
            if (Project) {
                await ctx.db.patch(args.id, {
                    name: args.name,
                    description: args.description,
                    responsibilities: args.responsibilities,
                    companyId: args.companyId
                }); 
                return Project._id;
            } else {
                const ProjectId = await ctx.db.insert("Project", {
                    name: args.name,
                    description: args.description,
                    responsibilities: args.responsibilities,
                    companyId: args.companyId
                });  
                return ProjectId;      
            }
            },
    });

    export const deleteProject= mutation({
    args: { id: v.id("Project") },
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

        const Project = await ctx.db.get(args.id);
        if (!Project) {
            throw new Error("Project not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
    });