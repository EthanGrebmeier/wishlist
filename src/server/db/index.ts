import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as userSchema from "./schema/users";
import * as wishlistSchema from "./schema/wishlist";

export const db = drizzle(new Client({ url: env.DATABASE_URL }), {
  schema: { ...userSchema, ...wishlistSchema },
});
