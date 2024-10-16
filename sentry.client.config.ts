// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { color } from "framer-motion";

Sentry.init({
  dsn: "https://a85287c10855a8a88052d9aa9d0bae86@o4507618020884480.ingest.de.sentry.io/4507644523577424",
//https://aae8500f375a9ecd0abccd9d4e04b6ab@o4507618020884480.ingest.de.sentry.io/4507644402139216
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      // Additional Replay configuration goes in here, for example:
      colorScheme: "dark"
    }),
  ],
});
