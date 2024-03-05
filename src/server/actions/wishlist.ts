"use server";

import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { serverActionResponseSchema } from "../db/schema/common";
import { privacyTypeSchema } from "~/schema/wishlist/wishlist";
import { db } from "../db";
import { wishlists } from "../db/schema/wishlist";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  wishlistId: z.string(),
  privacyType: privacyTypeSchema,
});

export const setPrivacyType = makeProtectedAction(
  inputSchema,
  async (formData, { session }) => {
    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.id, formData.wishlistId),
    });

    if (!wishlist) {
      return {
        message: "Wishlist not found",
      };
    }

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    await db
      .update(wishlists)
      .set({
        ...wishlist,
        privacyType: formData.privacyType,
      })
      .where(eq(wishlists.id, formData.wishlistId));

    return {
      message: "success",
    };
  },
);
