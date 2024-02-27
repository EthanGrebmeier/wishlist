"use server";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { productInputSchema } from "~/schema/wishlist/product";
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

export const addProduct = async (
  prevState: { message: string } | null,
  formData: {
    wishlistId: string;
    product: z.infer<typeof productInputSchema>;
  },
) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      message: "User not found",
    };
  }

  const { wishlistId, product } = formData;

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
};
