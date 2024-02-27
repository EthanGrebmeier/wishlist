"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { products } from "~/server/db/schema/wishlist";

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

    if (product.createdById !== session.user.id) {
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
