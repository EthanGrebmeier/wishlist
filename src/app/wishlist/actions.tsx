"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { wishlists } from "~/server/db/schema/wishlist";

export const deleteWishlist = async (
  prevState: { message: string } | null,
  formData: { wishlistId: string },
) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      message: "User not found",
    };
  }

  const result = z
    .object({
      wishlistId: z.string(),
    })
    .safeParse(formData);

  if (!result.success) {
    return {
      message: "Wishlist ID is required",
    };
  }

  const { wishlistId } = result.data;

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
};
