import type { db } from "~/server/db";
import type { NoUndefined } from "./utility";
import type { wishlistShares } from "~/server/db/schema/wishlist";

export type User = NoUndefined<
  Awaited<ReturnType<typeof db.query.users.findFirst>>
>;

export type UserType = typeof wishlistShares.$inferSelect.type;
export type UserTypeWithOwner = UserType | "owner";
