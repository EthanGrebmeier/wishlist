"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { wishlists } from "~/server/db/schema/wishlist";

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
