import { type NextRequest } from "next/server";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  productCommitments,
  products,
  wishlists,
} from "~/server/db/schema/wishlist";
import { productSchema } from "~/schema/wishlist/product";
import { checkUserIsWishlistEditor } from "~/lib/actions/protectedAction";
import { generateId } from "~/lib/utils";
import { eq } from "drizzle-orm";
import { getProduct } from "~/lib/wishlist/product/getProduct";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    const product = productSchema.parse(body);

    if (product.wishlistId) {
      // ensure user is an editor of the wishlist
      await checkUserIsWishlistEditor({
        wishlistId: product.wishlistId,
        session,
      });
    }

    if (product.id) {
      const existingProduct = await getProduct({ productId: product.id });

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

    return Response.json({ message: "success" });
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    return Response.json({ error: "Error updating product" }, { status: 500 });
  }
}
