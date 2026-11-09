import { createAuthClient } from "better-auth/react";

// No baseURL: the browser client calls the auth routes on its own origin, so
// sign-in keeps working when the dev server runs on a port other than
// BETTER_AUTH_URL (e.g. when 3000 is already in use).
export const authClient = createAuthClient();
