import { paginationOptsValidator } from "convex/server";
import { query, mutation, QueryCtx  } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { SocialLinkSchema, User, UserWithCountry } from "./helpers";

const getUserByTokenIdentifier = async (ctx: QueryCtx, tokenIdentifier: string) => {
  return await ctx.db
  .query("User")
  .withIndex("idx_token", (q) =>
    q.eq("tokenIdentifier", tokenIdentifier),
  )
  .unique();
}

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
    address: identity.address
  });
});

export const updateUser = mutation({
  args: { 
    id: v.id("User"),
    phoneNumber: v.optional(v.string()),
    address: v.optional(v.string()),
    countryId: v.optional(v.union(v.id("Country"), v.null())),  
    latitude: v.optional(v.float64()),
    longitude: v.optional(v.float64()),
    socialLinks: v.optional(v.array(SocialLinkSchema)),
  },
  handler: async (ctx, args) => {
    // Check if the user exists.
    const user = await ctx.db.get(args.id);

    const localUser =  {
      id: user?._id,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      countryId: user?.countryId,
      latitude: user?.latitude,
      longitude: user?.longitude,
      socialLinks: user?.socialLinks,
    }

    if (user !== null) {
      // If the user exists but the inputs have changed, patch the values.
      if (localUser !== args) {
          await ctx.db.patch(user._id, { 
            phoneNumber: args.phoneNumber,
            address: args.address,
            countryId: args.countryId,
            latitude: args.latitude,
            longitude: args.longitude,
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
    .withIndex("idx_user_name", (q) => q.eq("name", args.name))
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
        return {
          user,
          country
        } as UserWithCountry;

      }),
    ); 
  },
});  

export const getUser = query({
    args: {id: v.id("User") },
    handler: async (ctx, args) => {
      //return await ctx.db.get(args.UserId);
      const user = await ctx.db
      .query("User")
      .withIndex("by_id", (q) =>
        q.eq("_id", args.id))
      .unique();
      return user as User;
    },
}); 

export const getUserByName = query({
  args: {name: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
    .query("User")
    .withIndex("idx_user_name", (q) =>
      q.eq("name", args.name))
    .first();

    return user as User;
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Called getCurrentUser without authentication present");
    }
    return await getUserByTokenIdentifier(ctx, identity.tokenIdentifier);
  },
});

export const getUserSocialLinksByUserId = query({
  args: {userId: v.id("User") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const user = identity === null
      ? await ctx.db
        .query("User")
        .withIndex("by_id", (q) =>
          q.eq("_id", args.userId),
        )
        .first()
      : await getUserByTokenIdentifier(ctx, identity?.tokenIdentifier);

    return user?.socialLinks ?? [];

  },
});