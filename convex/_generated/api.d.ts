/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as companies from "../companies.js";
import type * as countries from "../countries.js";
import type * as files from "../files.js";
import type * as helpers from "../helpers.js";
import type * as occupations from "../occupations.js";
import type * as projects from "../projects.js";
import type * as Schema from "../Schema.js";
import type * as skillLinks from "../skillLinks.js";
import type * as skills from "../skills.js";
import type * as storage from "../storage.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  companies: typeof companies;
  countries: typeof countries;
  files: typeof files;
  helpers: typeof helpers;
  occupations: typeof occupations;
  projects: typeof projects;
  Schema: typeof Schema;
  skillLinks: typeof skillLinks;
  skills: typeof skills;
  storage: typeof storage;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
