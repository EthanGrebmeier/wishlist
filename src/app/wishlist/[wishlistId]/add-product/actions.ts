"use server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { productInputSchema } from "~/schema/wishlist/product";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { products } from "~/server/db/schema/wishlist";

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
    };
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
    };
  }

  revalidatePath(`/wishlist/${wishlistId}`);

  redirect(`/wishlist/${wishlistId}`);
};
