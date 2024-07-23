// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a85287c10855a8a88052d9aa9d0bae86@o4507618020884480.ingest.de.sentry.io/4507644523577424",
//https://aae8500f375a9ecd0abccd9d4e04b6ab@o4507618020884480.ingest.de.sentry.io/4507644402139216
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
  
});
