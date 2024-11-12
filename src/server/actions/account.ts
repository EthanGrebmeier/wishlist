"use server";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/users";
import { protectedAction } from "~/lib/actions/protectedAction";
import { z } from "zod";
import { wishlistShares } from "../db/schema/wishlist";

export const findUserByEmail = protectedAction
  .schema(z.object({ email: z.string(), wishlistId: z.string() }))
  .action(async ({ parsedInput: { email, wishlistId } }) => {
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
  });
