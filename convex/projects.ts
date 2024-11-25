import { Id } from "./_generated/dataModel";
import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";
import { CompanyWithProject } from "./helpers";


    export const getProjectsByUserId = query({
        args: {
            userId: v.id("User") 
        },
        handler: async (ctx, args) => {
            const projects = await ctx.db
            .query("Project")
            .filter((q) => q.eq(q.field("createdBy"), args.userId))      
            .order("asc")
            .collect();

            return Promise.all(
                projects.map(async (project) => {
                    return  {
                        project,
                        company: project.companyId? await ctx.db.get(project.companyId as Id<"Company">): null,
                        user: await ctx.db.get(project.createdBy as Id<"User">)
                    } as CompanyWithProject;
                }),
            ); 
    },
    });

    export const getProjects = query({
        handler: async (ctx) => {
            const projects = await ctx.db
            .query("Project")
            .withIndex("idx_project_name")        
            .order("asc")
            .collect();

            return Promise.all(
                projects.map(async (project) => {
                    return  {
                        project,
                        company: project.companyId? await ctx.db.get(project.companyId as Id<"Company">): null,
                        user: await ctx.db.get(project.createdBy as Id<"User">)
                    } as CompanyWithProject;
                }),
            ); 
    },
    });

    export const getProjectsByCurrentUser = query({
        handler: async (ctx) => {
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
                throw new Error("Unauthenticated call to getProjectsByCurrentUser");
            }

            const user = await ctx.db
            .query("User")
            .withIndex("idx_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();

            const projects = user 
            ? await ctx.db
                .query("Project")
                .withIndex("idx_createdBy", (q) =>
                    q.eq("createdBy", user._id))        
                .order("asc")
                .collect()
            : undefined;

            return Promise.all(
                (projects ?? []).map(async (project) => {
                    return  {
                        project,
                        company: await ctx.db.get(project.companyId as Id<"Company">),
                        user: await ctx.db.get(project.createdBy as Id<"User">)
                    } as CompanyWithProject;
                })
            ); 
    },
    });

    export const getProject = query({
        args: {id: v.id("Project") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.id);
        },
    });

    export const createOrUpdateProject = mutation({
        args: { 
            id: v.union(v.id("Project"), v.null()),
            name: v.string(),
            description: v.optional(v.string()),
            responsibilities: v.optional(v.array(v.object({
                value: v.string()
            }))),
            skills: v.optional(v.array(v.object({
                value: v.string()
            }))),            
            companyId: v.optional(v.union(v.id("Company"), v.null()))
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
                const Project = await ctx.db.get(args.id);
                await ctx.db.patch(args.id, {
                    name: args.name,
                    description: args.description,
                    responsibilities: args.responsibilities,
                    skills: args.skills,
                    companyId: args.companyId,
                    createdBy: Project?.createdBy,
                }); 
                return Project?._id;
            } else {
                const ProjectId = await ctx.db.insert("Project", {
                    name: args.name,
                    description: args.description,
                    responsibilities: args.responsibilities,
                    skills: args.skills,
                    companyId: args.companyId,
                    createdBy: user._id,
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