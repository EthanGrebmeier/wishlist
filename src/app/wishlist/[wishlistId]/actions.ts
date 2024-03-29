"use server";

import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { productInputSchema } from "~/schema/wishlist/product";
import { shareWishlistInputSchema } from "~/schema/wishlist/wishlist";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  products,
  wishlistShares,
  wishlists,
} from "~/server/db/schema/wishlist";

export const deleteProduct = async (
  prevState: { message: string } | null,
  formData: { productId: string; wishlistId: string },
) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      message: "User not found",
    };
  }

  const result = z
    .object({
      productId: z.string(),
      wishlistId: z.string(),
    })
    .safeParse(formData);

  if (!result.success) {
    return {
      message: "Product ID is required",
    };
  }

  const { productId, wishlistId } = result.data;

  try {
    const product = await getProduct({
      productId,
    });

    if (product?.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    await db.delete(products).where(eq(products.id, productId));

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
};

export const addProduct = makeProtectedAction(
  z.object({ wishlistId: z.string(), product: productInputSchema }),
  async ({ wishlistId, product }, { session }) => {
    const parsedProduct = productInputSchema.safeParse(product);

    if (!parsedProduct.success) {
      return {
        message: parsedProduct.error.message,
      };
    }

    if (!wishlistId) {
      return {
        message: "Wishlist ID is required",
      } as const;
    }

    const productValues = {
      ...parsedProduct.data,
      id: randomUUID(),
      wishlistId,
      createdById: session.user.id,
    };

    try {
      await db.insert(products).values(productValues);
    } catch (e) {
      console.error("Error inserting product", e);
      return {
        message: "Error inserting product",
      } as const;
    }

    revalidatePath(`/wishlist/${wishlistId}`);

    return {
      message: "success",
    };
  },
);

export const shareWishlist = makeProtectedAction(
  shareWishlistInputSchema,
  async (input, { session }) => {
    const { wishlistId } = input;

    try {
      const matchingWishlist = await db.query.wishlists.findFirst({
        where: and(
          eq(wishlists.id, wishlistId),
          eq(wishlists.createdById, session.user.id),
        ),
      });

      if (!matchingWishlist) {
        return {
          message: "Access Denied",
        };
      }

      const wishlistShareId = randomUUID();

      await db.insert(wishlistShares).values({
        ...input,
        id: wishlistShareId,
        createdById: session.user.id,
      });
    } catch (e) {
      console.log("Error sharing wishlist", e);
      return {
        message: "Internal Server Error",
      };
    }

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
