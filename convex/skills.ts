import { Id } from "./_generated/dataModel";
import { query, mutation, QueryCtx  } from "./_generated/server";
import { v } from "convex/values";
import { UserSkill } from "./helpers";

const getLinkedSkills = async (ctx: QueryCtx, parentId: Id<"Skill">) => {
    const linkedSkills = await ctx.db
                                    .query("SkillLink")
                                    .withIndex("idx_parent", (q) =>
                                        q.eq("parentId", parentId),
                                    )
                                    .collect();

    return Promise.all(                                
        (linkedSkills ?? []).map(async (link) =>{
            const skill = await ctx.db.get(link.childId as Id<"Skill">);
            return skill?.name;
        })
    );
}

export const getSkills = query({
    handler: async (ctx) => {
        const skills = await ctx.db
                            .query("Skill")
                            .order("asc")
                            .collect();


        return Promise.all(
            skills.map(async (skill) => {
                const user = await ctx.db.get(skill.createdBy as Id<"User">);
                const linkedSkills = await getLinkedSkills(ctx, skill._id);

                return  {
                    ...skill,
                    user : {
                        userName: user?.name,
                        userEmail: user?.email,
                        userPictureUrl: user?.pictureUrl
                    },
                    linkedSkills
                } as UserSkill;
            }),
        ); 
        
    },
});

export const getSkillByName = query({
    args: {name: v.string() },
    handler: async (ctx, args) => {
        const skill = await ctx.db
        .query("Skill")
        .withIndex("idx_skill_name", (q) =>
            q.eq("name", args.name))
        .order("asc")
        .first() ;

        const user = skill?.createdBy
                    ? await ctx.db.get(skill?.createdBy as Id<"User">)
                    : null;

        return {
            ...skill,
            user: {
                userName: user?.name,
                userEmail: user?.email,
                userPictureUrl: user?.pictureUrl
            }
        } 

         
    },
});

export const getOtherSkills = query({
    args: {id: v.id("Skill") },
    handler: async (ctx, args) => {

        // Fetch all SkillLink objects where the `parentId` field matches the given `id`.
        const linkedSkills = await ctx.db
        .query("SkillLink")
        .withIndex("idx_parent", (q) => q.eq("parentId", args.id))
        .collect() ;

        const joinedChildIds = linkedSkills.length > 0 
        ? linkedSkills.map((skill) => skill.childId).join("#") 
        : "";
        console.log("Linked Child Ids:", joinedChildIds);
        // map() is used to create a new array containing only the childId properties of each Skill object.
        // join('#') is then used to concatenate these childIds into a single string, separated by #.

        // Fetch all Skill objects where the `_id` field is not equal to the given `id`,
        // and the `_id` field is not present in the `linkedSkills` string.
        const allOtherSkills = await ctx.db
        .query("Skill")
        //.withIndex("idx_user_name", (q) => q..eq("name", args.name))
        .filter((q) => q.neq(q.field("_id"), args.id))
        .order("asc")
        .collect();  

        
        return Promise.all(
            allOtherSkills.filter((skill) => {
                if (joinedChildIds.indexOf(skill._id) === -1) {
                    return skill;
                }
            })
        );        
    },
});

export const getSkillCodes = query({
    handler: async (ctx) => {
        const skills = await ctx.db
        .query("Skill")
        .order("asc")
        .collect() ;

        return Promise.all(
            (skills ?? []).map(async (skill) => {
                return skill.code ?? "";
            }),
        ); 

         
    },
});

export const getSkill = query({
    args: {SkillId: v.id("Skill") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.SkillId);
    },
});

export const createOrUpdateSkill = mutation({
    args: { 
        id: v.union(v.id("Skill"), v.null()), 
        name: v.string(),
        code: v.optional(v.string()),
        icon: v.optional(v.string())
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

        console.log("icon value:", args.icon)

        
        if (args.id !== null) {
            const Skill = await ctx.db.get(args.id);
            await ctx.db.patch(args.id, {
                name: args.name,
                code: args.code,
                icon: args.icon,
                createdBy: Skill?.createdBy
            }); 
            return Skill?._id;
        } else {
            const SkillId = await ctx.db.insert("Skill", {
                name: args.name,
                code: args.code,
                icon: args.icon,
                createdBy: user._id
            });  
            return SkillId;      
        }
    },
});

export const deleteSkill= mutation({
    args: { id: v.id("Skill") },
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

        const Skill = await ctx.db.get(args.id);
        if (!Skill) {
            throw new Error("Skill not found");
        } else {
            await ctx.db.delete(args.id);
        }
        
    },
});