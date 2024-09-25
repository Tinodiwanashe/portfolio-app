import { paginationOptsValidator } from "convex/server";
import { query, mutation  } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const store = mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called storeUser without authentication present");
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
              ...user,
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
  
          if (!identity) {
              return null;
          }
  
          // throw new Error("Unauthenticated call to query");
          const user = await ctx.db
              .query("User")
              .withIndex("idx_token", (q) =>
                  q.eq("tokenIdentifier", identity.tokenIdentifier)
              )
              .unique();
  
          return user;
      }
  });
