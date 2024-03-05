import type { db } from "~/server/db";
import type { NoUndefined } from "./utility";

export type User = NoUndefined<
  Awaited<ReturnType<typeof db.query.users.findFirst>>
>;
