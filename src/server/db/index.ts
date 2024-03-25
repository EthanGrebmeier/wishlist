import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";
import * as userSchema from "./schema/users";
import * as wishlistSchema from "./schema/wishlist";

const client = postgres(env.DATABASE_URL, {
  prepare: false,
});

export const db = drizzle(client, {
  schema: { ...userSchema, ...wishlistSchema },
});
