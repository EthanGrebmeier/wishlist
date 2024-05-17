"use server";

import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";

import { productSchema } from "~/schema/wishlist/product";
import { db } from "../db";
import {
  productCommitments,
  productReceipts,
  products,
  wishlistShares,
  wishlists,
} from "../db/schema/wishlist";
import { and, eq, or } from "drizzle-orm";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { revalidatePath } from "next/cache";
import { generateId } from "~/lib/utils";

export const updateProduct = makeProtectedAction(
  productSchema,
  async (product, { session }) => {
    // confirm user can perform this action
    const dbProduct = await getProduct({ productId: product.id });

    if (dbProduct?.createdById !== session.user.id) {
      throw new Error("Access denied");
    }

    await db
      .update(products)
      .set(product)
      .where(
        and(
          eq(products.createdById, session.user.id),
          eq(products.id, product.id),
        ),
      );

    await db
      .update(wishlists)
      .set({
        updatedAt: new Date(),
      })
      .where(eq(wishlists.id, product.wishlistId));

    return {
      message: "success",
    };
  },
);

export const commitToProduct = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }, { session }) => {
    const dbProduct = await getProduct({ productId });

    if (!dbProduct) {
      throw new Error("Product doesn't exist");
    }

    const matchingProductReceipt = await db.query.productReceipts.findFirst({
      where: eq(productReceipts.productId, productId),
    });

    if (matchingProductReceipt) {
      // We want to refresh the user's page since they are seeing stale data
      return revalidatePath(`/product/${productId}`);
    }

    // Ensure the wishlist is shared with the user
    const dbShares = await db.query.wishlistShares.findFirst({
      where: and(
        eq(wishlistShares.wishlistId, dbProduct.wishlistId),
        or(
          // Either the wishlist is shared with the user
          eq(wishlistShares.sharedWithUserId, session.user.id),
          // OR the user is the one who made the wishlist
          eq(wishlistShares.createdById, session.user.id),
        ),
      ),
    });

    if (!dbShares) {
      throw new Error("Access denied");
    }

    await db.insert(productCommitments).values({
      createdById: session.user.id,
      productId: dbProduct.id,
      wishlistId: dbProduct.wishlistId,
      id: generateId(),
    });

    return {
      message: "success",
    };
  },
);

export const uncommitToProduct = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }, { session }) => {
    const matchingProductReceipt = await db.query.productReceipts.findFirst({
      where: eq(productReceipts.productId, productId),
    });

    if (matchingProductReceipt) {
      // We want to refresh the user's page since they are seeing stale data
      return revalidatePath(`/product/${productId}`);
    }

    await db
      .delete(productCommitments)
      .where(
        and(
          eq(productCommitments.productId, productId),
          eq(productCommitments.createdById, session.user.id),
        ),
      );

    return {
      message: "success",
    };
  },
);

export const getProductCommitments = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }) => {
    const dbCommitments = await db.query.productCommitments.findMany({
      where: and(
        eq(productCommitments.productId, productId),
        // eq(productCommitments.createdById, session.user.id),
      ),
      with: {
        user: true,
      },
    });

    return dbCommitments;
  },
);

export const markProductReceived = makeProtectedAction(
  z.object({
    productId: z.string(),
    wishlistId: z.string(),
    purchasedByUserId: z.string().optional(),
  }),
  async ({ productId, wishlistId, purchasedByUserId }, { session }) => {
    // confirm user can perform this action
    const dbProduct = await getProduct({ productId });

    if (dbProduct?.createdById !== session.user.id) {
      throw new Error("Access denied");
    }

    // Make sure there aren't any receipts yet
    const matchingProductReceipt = await db.query.productReceipts.findFirst({
      where: eq(productReceipts.productId, productId),
    });

    if (matchingProductReceipt) {
      // We want to refresh the user's page since they are seeing stale data
      return revalidatePath(`/product/${productId}`);
    }

    await db.insert(productReceipts).values({
      createdById: session.user.id,
      productId: productId,
      wishlistId,
      purchasedByUserId,
      id: generateId(),
    });

    await db
      .delete(productCommitments)
      .where(eq(productCommitments.productId, productId));
  },
);

export const getProductReceipts = makeProtectedAction(
  z.object({ productId: z.string() }),
  async ({ productId }, { session }) => {
    // confirm user can perform this action
    const dbProduct = await getProduct({ productId });

    if (dbProduct?.createdById !== session.user.id) {
      throw new Error("Access denied");
    }

    return db.query.productReceipts.findFirst({
      where: eq(productReceipts.productId, productId),
    });
  },
);
