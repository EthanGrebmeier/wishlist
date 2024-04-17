"use server";

import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { colorSchema, privacyTypeSchema } from "~/schema/wishlist/wishlist";
import { db } from "../db";
import { wishlistShares, wishlists } from "../db/schema/wishlist";
import { and, eq } from "drizzle-orm";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export const deleteWishlist = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    try {
      const wishlist = await getWishlist({
        wishlistId,
      });

      if (wishlist.createdById !== session.user.id) {
        return {
          message: "Access Denied",
        };
      }

      await db.delete(wishlists).where(eq(wishlists.id, wishlistId));

      revalidatePath(`/wishlist`);

      return {
        message: "success",
      };
    } catch (e) {
      console.error("Error deleting wishlist", e);
      return {
        message: "Unable to delete wishlist",
      };
    }
  },
);

export const createWishlist = makeProtectedAction(
  z.object({
    wishlistName: z.string().min(1),
    date: z.date().optional(),
    isSecret: z.boolean(),
    color: colorSchema,
  }),
  async ({ wishlistName, date, color, isSecret }, { session }) => {
    const wishlistValues = {
      createdById: session.user.id,
      name: wishlistName,
      id: randomUUID(),
      dueDate: date?.toDateString(),
      color,
      isSecret,
    };
    try {
      await db.insert(wishlists).values(wishlistValues);

      await db.insert(wishlistShares).values({
        createdById: session.user.id,
        wishlistId: wishlistValues.id,
        sharedWithUserId: session.user.id,

        id: randomUUID(),
      });
    } catch (e) {
      console.error(e);
      return {
        message: "Could not insert wishlist",
      };
    }

    redirect(`/wishlist/${wishlistValues.id}`);
  },
);

export const updateWishlist = makeProtectedAction(
  z.object({
    id: z.string(),
    wishlistName: z.string(),
    date: z.date().optional(),
    color: colorSchema,
    isSecret: z.boolean(),
  }),
  async ({ wishlistName, date, color, isSecret, id }, { session }) => {
    const wishlistValues = {
      name: wishlistName,
      dueDate: date?.toDateString(),
      color,
      isSecret,
    };
    try {
      await db
        .update(wishlists)
        .set(wishlistValues)
        .where(
          and(eq(wishlists.id, id), eq(wishlists.createdById, session.user.id)),
        );
    } catch (e) {
      console.error(e);
      throw new Error("Could not update wishlist");
    }
  },
);

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

export const updateTitle = makeProtectedAction(
  z.object({
    title: z.string(),
    wishlistId: z.string(),
  }),
  async ({ title, wishlistId }, { session }) => {
    await db
      .update(wishlists)
      .set({
        name: title,
      })
      .where(
        and(
          eq(wishlists.id, wishlistId),
          eq(wishlists.createdById, session.user.id),
        ),
      );
  },
);
