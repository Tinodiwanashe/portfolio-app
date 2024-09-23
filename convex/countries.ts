import { paginationOptsValidator } from "convex/server";
import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";

export const getCountries = query({
    handler: async (ctx) => {
        return await ctx.db
        .query("Country")
        .withIndex("idx_country_name")
        .order("asc")
        .collect();
        },
});

export const getUser = query({
    args: {id: v.id("Country") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});  

