"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { generateId } from "~/lib/utils";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { productInputSchema } from "~/schema/wishlist/product";
import { shareWishlistInputSchema } from "~/schema/wishlist/wishlist";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  magicWishlistLinks,
  products,
  wishlistShares,
  wishlists,
} from "~/server/db/schema/wishlist";
import { deleteFile } from "~/server/uploadthing";
import { Resend } from "resend";
import { InviteEmail } from "~/email/invite";
import { users } from "~/server/db/schema/users";
import { env } from "~/env";

export const deleteProduct = makeProtectedAction(
  z.object({ productId: z.string(), wishlistId: z.string() }),
  async ({ productId, wishlistId }, { session }) => {
    try {
      const product = await getProduct({
        productId,
      });

      if (product?.createdById !== session.user.id) {
        return {
          message: "Access Denied",
        };
      }

      // 1. Delete Product Image

      await deleteFile(product.imageUrl);

      // 2. Delete Product
      await db.delete(products).where(eq(products.id, productId));

      await db
        .update(wishlists)
        .set({
          updatedAt: new Date(),
        })
        .where(eq(wishlists.id, product.wishlistId));

      revalidatePath(`/wishlist/${wishlistId}`);

      return {
        message: "success",
      };
    } catch (e) {
      console.error("Error deleting product", e);
      return {
        message: "Unable to delete product",
      };
    }
  },
);

export const addProduct = makeProtectedAction(
  productInputSchema.extend({ wishlistId: z.string() }),
  async (product, { session }) => {
    const productValues = {
      ...product,
      id: generateId(),
      createdById: session.user.id,
    };

    try {
      await db.insert(products).values(productValues);
      await db
        .update(wishlists)
        .set({
          updatedAt: new Date(),
        })
        .where(eq(wishlists.id, product.wishlistId));
    } catch (e) {
      console.error("Error inserting product", e);
      return {
        message: "Error inserting product",
      } as const;
    }

    revalidatePath(`/wishlist/${product.wishlistId}`);

    return {
      message: "success",
    };
  },
);

export const unshareWishlist = async (
  prevState: { message: string } | null,
  input: z.infer<typeof shareWishlistInputSchema>,
) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      message: "User not found",
    };
  }

  const parsedInput = shareWishlistInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      message: parsedInput.error.message,
    };
  }

  const { wishlistId, sharedWithUserId } = parsedInput.data;

  try {
    await db
      .delete(wishlistShares)
      .where(
        and(
          eq(wishlistShares.createdById, session.user.id),
          eq(wishlistShares.sharedWithUserId, sharedWithUserId),
          eq(wishlistShares.wishlistId, wishlistId),
        ),
      );
  } catch (e) {
    console.log("Error unsharing wishlist ", e);
    return {
      message: "Internal Server Error",
    };
  }

  return {
    message: "success",
  };
};
