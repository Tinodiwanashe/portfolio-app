// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a85287c10855a8a88052d9aa9d0bae86@o4507618020884480.ingest.de.sentry.io/4507644523577424",
//https://aae8500f375a9ecd0abccd9d4e04b6ab@o4507618020884480.ingest.de.sentry.io/4507644402139216
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
