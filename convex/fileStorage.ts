import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

/* 
Every stored file is reflected as a document in the "_storage" system table. 
File metadata of a file can be accessed from queries and mutations via db.system.get and db.system.query 
*/

export const getMetadata = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.system.get(args.storageId);
  },
});

export const listAllFiles = query({
  handler: async (ctx) => {
    // You can use .paginate() as well
    return await ctx.db.system.query("_storage").collect();
  },
});

// Storage IDs correspond to documents in the "_storage" system table (see Metadata), so they can be validated using the v.id("_storage").
export const deleteById = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});