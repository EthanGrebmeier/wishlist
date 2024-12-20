"use server";

import { z } from "zod";
import {
  checkUserIsWishlistEditor,
  protectedAction,
} from "~/lib/actions/protectedAction";

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
import { deleteFile } from "../uploadthing";

export const updateProduct = protectedAction
  .schema(productSchema)
  .action(async ({ parsedInput: product, ctx: { session } }) => {
    if (product.wishlistId) {
      // ensure user is an editor of the wishlist
      await checkUserIsWishlistEditor({
        wishlistId: product.wishlistId,
        session,
      });
    }
    if (product.id) {
      const existingProduct = await db.query.products.findFirst({
        where: eq(products.id, product.id),
      });

      if (existingProduct?.wishlistId !== product.wishlistId) {
        // We need to remove commitments to this product
        await db
          .delete(productCommitments)
          .where(eq(productCommitments.productId, product.id));
      }
    }

    await db
      .insert(products)
      .values({
        ...product,
        createdById: session.user.id,
        id: product.id ?? generateId(),
      })
      .onConflictDoUpdate({
        target: products.id,
        set: product,
      });

    await db
      .update(wishlists)
      .set({
        updatedAt: new Date(),
      })
      .where(eq(wishlists.id, product.wishlistId));

    return {
      message: "success",
    };
  });

export const commitToProduct = protectedAction
  .schema(
    z.object({
      productId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { productId }, ctx: { session } }) => {
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
  });

export const uncommitToProduct = protectedAction
  .schema(
    z.object({
      productId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { productId }, ctx: { session } }) => {
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
  });

export const getProductCommitments = protectedAction
  .schema(
    z.object({
      productId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { productId } }) => {
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
  });

export const markProductReceived = protectedAction
  .schema(
    z.object({
      productId: z.string(),
      wishlistId: z.string(),
      purchasedByUserId: z.string().optional(),
    }),
  )
  .action(
    async ({
      parsedInput: { productId, wishlistId, purchasedByUserId },
      ctx: { session },
    }) => {
      // confirm user can perform this action
      const dbProduct = await getProduct({ productId });

      if (!dbProduct) {
        throw new Error("Product not found");
      }
      // ensure user is an editor of the wishlist
      await checkUserIsWishlistEditor({
        wishlistId: dbProduct.wishlistId,
        session,
      });

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

export const getProductReceipts = protectedAction
  .schema(z.object({ productId: z.string() }))
  .action(async ({ parsedInput: { productId }, ctx: { session } }) => {
    // confirm user can perform this action
    const dbProduct = await getProduct({ productId });

    if (!dbProduct) {
      throw new Error("Product not found");
    }
    // ensure user is an editor of the wishlist
    await checkUserIsWishlistEditor({
      wishlistId: dbProduct.wishlistId,
      session,
    });

    return db.query.productReceipts.findMany({
      where: eq(productReceipts.productId, productId),
    });
  });

export const removeProductReceipt = protectedAction
  .schema(z.object({ productId: z.string() }))
  .action(async ({ parsedInput: { productId }, ctx: { session } }) => {
    // ensure user is an editor of the wishlist
    const dbProduct = await getProduct({ productId });

    if (!dbProduct) {
      throw new Error("Product not found");
    }
    await checkUserIsWishlistEditor({
      wishlistId: dbProduct.wishlistId,
      session,
    });
    await db
      .delete(productReceipts)
      .where(eq(productReceipts.productId, productId));
  });

export const deleteProduct = protectedAction
  .schema(z.object({ productId: z.string(), wishlistId: z.string() }))
  .action(
    async ({ parsedInput: { productId, wishlistId }, ctx: { session } }) => {
      try {
        const dbProduct = await getProduct({
          productId,
        });

        if (!dbProduct) {
          throw new Error("Product not found");
        }
        // ensure user is an editor of the wishlist
        await checkUserIsWishlistEditor({
          wishlistId: dbProduct.wishlistId,
          session,
        });

        // 1. Delete Product Image
        await deleteFile(dbProduct.imageUrl);

        // 2. Delete Product
        await db.delete(products).where(eq(products.id, productId));

        await db
          .update(wishlists)
          .set({
            updatedAt: new Date(),
          })
          .where(eq(wishlists.id, dbProduct.wishlistId));

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

export const copyProduct = protectedAction
  .schema(z.object({ productId: z.string(), wishlistId: z.string() }))
  .action(
    async ({ parsedInput: { productId, wishlistId }, ctx: { session } }) => {
      const dbProduct = await getProduct({ productId });

      if (!dbProduct) {
        throw new Error("Product not found");
      }

      await checkUserIsWishlistEditor({
        wishlistId: dbProduct.wishlistId,
        session,
      });

      try {
        await db.insert(products).values({
          ...dbProduct,
          createdById: session.user.id,
          updatedAt: new Date(),
          createdAt: new Date(),

          id: generateId(),
          wishlistId,
        });
      } catch (e) {
        console.error("Error copying product", e);
        throw new Error("Unable to copy product");
      }

      return {
        message: "success",
      };
    },
  );
