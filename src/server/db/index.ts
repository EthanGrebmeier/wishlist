import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env";
import * as userSchema from "./schema/users";
import * as wishlistSchema from "./schema/wishlist";

const client = neon(env.DATABASE_URL);

export const db = drizzle(client, {
  schema: { ...userSchema, ...wishlistSchema },
});
