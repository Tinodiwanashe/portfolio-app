
// You can futher customize the query builder, see convex-helpers/server/customFunctions.
import { NoOp } from "convex-helpers/server/customFunctions";
import { action, mutation, query } from "./_generated/server";
import { withSystemFields, zCustomAction, zCustomMutation, zCustomQuery } from "convex-helpers/server/zod";
import { z } from "zod";

// A custom version of a query builder that uses zod to validate the input and output types.
export const queryWithZod = zCustomQuery(query, NoOp);

// A custom version of a mutation builder that uses zod to validate the input and output types.
export const mutationWithZod = zCustomMutation(mutation, NoOp);

// A custom version of an action builder that uses zod to validate the input and output types.
export const actionWithZod = zCustomAction(action, NoOp);

export const zUser = z.object(
  withSystemFields("User", { 
    name: z.string().optional(),
    tokenIdentifier: z.string().optional(),
    pictureUrl: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string({
      required_error: "Please add a phone number to display.",
    }).optional(),
    address: z.string({
      message: "address must be at least 2 characters.",
    }).optional(),
    countryId: z.string({
      required_error: "Please select a country."
    }).optional(),
    socialLinks: z.array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    ).optional()
  })
)