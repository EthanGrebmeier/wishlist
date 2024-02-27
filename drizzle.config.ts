import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["wishlist_*"],
} satisfies Config;
