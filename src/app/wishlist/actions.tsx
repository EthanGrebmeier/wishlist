"use server";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { db } from "~/server/db";
import { wishlistShares, wishlists } from "~/server/db/schema/wishlist";

export const deleteWishlist = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    console.log("deleting");

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
  z.object({ wishlistName: z.string(), date: z.date().optional() }),
  async ({ wishlistName, date }, { session }) => {
    const wishlistValues = {
      createdById: session.user.id,
      name: wishlistName,
      id: randomUUID(),
      dueDate: date,
    };
    console.log(wishlistValues);
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
