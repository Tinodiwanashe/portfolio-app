import { paginationOptsValidator } from "convex/server";
import { query, mutation, internalQuery, QueryCtx  } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { zUser } from "./zod";
import { z } from "zod";
import { withSystemFields, zCustomAction, zCustomMutation, zCustomQuery } from "convex-helpers/server/zod";
import { customCtx, NoOp } from "convex-helpers/server/customFunctions";

export const store = mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called store User without authentication present");
  }

  // Check if we've already stored this identity before.
  const user = await db
    .query("User")
    .withIndex("idx_token", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();
  if (user !== null) {
    // If we've seen this identity before but the name has changed, patch the value.
    if (user.name !== identity.name) {
      await db.patch(user._id, { name: identity.name });
    }

    if (user.pictureUrl !== identity.pictureUrl) {
      await db.patch(user._id, { pictureUrl: identity.pictureUrl });
    }

    if (user.phoneNumber !== identity.phoneNumber) {
      await db.patch(user._id, { phoneNumber: identity.phoneNumber });
    }

    return user._id;
  }
  // If it's a new identity, create a new `User`.
  return db.insert("User", {
    name: identity.name!,
    tokenIdentifier: identity.tokenIdentifier,
    email: identity.email,
    address: identity.address,
    countryId: null 
  });
});

export const updateUser = mutation({
  args: { 
    id: v.id("User"),
    phoneNumber: v.optional(v.string()),
    address: v.optional(v.string()),
    countryId: v.union(v.id("Country"), v.null()),  
    socialLinks: v.optional(v.array(v.object({
      value: v.string()
    })))
  },
  handler: async (ctx, args) => {
    // Check if the user exists.
    const user = await ctx.db.get(args.id);

    if (user !== null) {
      // If the user exists but the inputs have changed, patch the values.
      if (user.phoneNumber !== args.phoneNumber || user.address !== args.address ||  user.countryId !== args.countryId || user.socialLinks !== args.socialLinks) {
          await ctx.db.patch(user._id, { 
            phoneNumber: args.phoneNumber,
            address: args.address,
            countryId: args.countryId,
            socialLinks: args.socialLinks
          });
      }

      return user._id;
    } else {
      throw new Error("User not found");
    }
  
  },
});

export const deleteUser = mutation({
  args: { id: v.id("User") },
  handler: async (ctx, args) => {
      const user = await ctx.db.get(args.id);
      if (!user) {
          throw new Error("User not found");
      } else {
          await ctx.db.delete(args.id);
      }
      
  },
});

export const getUsersPaginated = query({
  args: {paginationOpts: paginationOptsValidator, name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
    .query("User")
    .filter((q) => q.eq(q.field("name"), args.name))
    .withIndex("idx_user_name")
    .order("asc")
    .paginate(args.paginationOpts);
  },
});
  
export const getUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db
    .query("User")
    .withIndex("idx_user_name")
    .order("asc")
    .collect();

      return Promise.all(
      users.map(async (user) => {
        // For each user , fetch the `Country` he comes from and
        // insert the name into the `Country name` field.
        const country = await ctx.db.get(user.countryId as Id<"Country">);
        const UserWithCountry =  {
          user: user,
          country: country
        };
        return UserWithCountry;
      }),
    ); 
  },
});  

export const getUser = query({
    args: {id: v.id("User") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});  

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Called getCurrentUser without authentication present");
    }
    console.log("token: ",identity.tokenIdentifier);
    return await getUserByTokenIdentifier(ctx, identity.tokenIdentifier);
  }
});

const getUserByTokenIdentifier = async (ctx: QueryCtx, tokenIdentifier: string) => {
  return await ctx.db
  .query("User")
  .withIndex("idx_token", (q) =>
    q.eq("tokenIdentifier", tokenIdentifier),
  )
  .unique();
}
