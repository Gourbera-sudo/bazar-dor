import { betterAuth } from "better-auth";

import { MongoClient } from "mongodb";

import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db("bazar-dor");

// Allow the app to run on any local port (next dev picks a free one when the
// default is taken) and on the host Vercel assigns to the deployment.
const loopbackHosts = [
  "localhost",
  "localhost:*",
  "127.0.0.1",
  "127.0.0.1:*",
  "[::1]",
  "[::1]:*",
];

// Vercel injects these at runtime as bare hosts (no protocol).
const vercelHosts = [
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
].filter(Boolean);

const envBaseURL = process.env.BETTER_AUTH_URL;

const envBaseURLHost = (() => {
  if (!envBaseURL) return null;
  try {
    return new URL(envBaseURL).host;
  } catch {
    return null;
  }
})();

const isLoopbackURL =
  /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\/?$/i;

// A localhost BETTER_AUTH_URL is useless once deployed, so fall back to the
// production host Vercel exposes.
const fallbackBaseURL =
  envBaseURL && !isLoopbackURL.test(envBaseURL)
    ? envBaseURL
    : vercelHosts.length > 0
      ? `https://${vercelHosts[0]}`
      : envBaseURL;

export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      ...new Set([...loopbackHosts, ...vercelHosts, envBaseURLHost].filter(Boolean)),
    ],
    protocol: "auto",
    fallback: fallbackBaseURL,
  },

  advanced: {
    // Vercel terminates TLS and forwards the public host/protocol in these
    // headers. Hosts are still validated against allowedHosts above.
    trustedProxyHeaders: true,
  },

  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
      // Google/GitHub return a verified email, so an OAuth sign-in may be
      // linked to an existing account with the same address.
      trustedProviders: ["google", "github"],
      // Email/password users are stored with emailVerified: false because this
      // app has no email-verification flow yet. Without this, signing in with
      // Google/GitHub for one of those addresses fails with
      // "unable_to_link_account".
      requireLocalEmailVerified: false,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,

      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
