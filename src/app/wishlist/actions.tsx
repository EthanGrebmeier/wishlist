"use server";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

const createWishlistInputSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  id: z.string(),
  createdById: z.string(),
});

export const createWishlist = async (
  prevState: { message: string } | null,
  formData: {
    wishlistName: string;
  },
) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      message: "User not found",
    };
  }

  const validatedFields = createWishlistInputSchema.safeParse({
    createdById: session.user.id,
    name: formData.wishlistName,
    id: randomUUID(),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.toString(),
    };
  }

  const wishlistValues = validatedFields.data;

  try {
    await db.insert(wishlists).values(wishlistValues);
  } catch (e) {
    console.error(e);
    return {
      message: "Could not insert wishlist",
    };
  }

  redirect(`/wishlist/${wishlistValues.id}`);
};
