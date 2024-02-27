"use server";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/users";
import {
  makeProtectedAction,
  makeSafeAction,
} from "~/lib/actions/protectedAction";
import { z } from "zod";
import { wishlistShares } from "../db/schema/wishlist";

export const findUserByEmail = makeProtectedAction(
  z.object({ email: z.string(), wishlistId: z.string() }),
  async ({ email, wishlistId }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return;
    }

    const existingShare = await db.query.wishlistShares.findFirst({
      where: and(
        eq(wishlistShares.sharedWithUserId, user.id),
        eq(wishlistShares.wishlistId, wishlistId),
      ),
    });

    return {
      ...user,
      isShared: !!existingShare,
    };
  },
);
