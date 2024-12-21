"use server";

import { and, eq, ilike, or, sql } from "drizzle-orm";
import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { products, wishlistShares, wishlists } from "../db/schema/wishlist";

const sanitizeSearchQuery = (query: string) => {
  // Remove special characters and brackets, keep alphanumeric, spaces, and basic punctuation
  return query.replace(/[^\w\s.,!?-]/g, "");
};

export const searchWishlistsAndProducts = async (query: string) => {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      wishlists: [],
    };
  }

  const sanitizedQuery = sanitizeSearchQuery(query);

  // First get the IDs of wishlists that match our criteria
  const matchingWishlistIds = await db
    .select({ id: wishlists.id })
    .from(wishlists)
    .leftJoin(wishlistShares, eq(wishlists.id, wishlistShares.wishlistId))
    .leftJoin(products, eq(wishlists.id, products.wishlistId))
    .where(
      and(
        // User has access to the wishlist
        or(
          eq(wishlists.createdById, session.user.id),
          eq(wishlistShares.sharedWithUserId, session.user.id),
        ),
        // Wishlist name matches or has matching products
        or(
          ilike(wishlists.name, `%${sanitizedQuery}%`),
          ilike(products.name, `%${sanitizedQuery}%`),
          ilike(products.description ?? "", `%${sanitizedQuery}%`),
        ),
      ),
    )
    .groupBy(wishlists.id);

  // Then get the full wishlist data for these IDs
  const accessibleWishlists = await db.query.wishlists.findMany({
    where: sql`${wishlists.id} IN ${matchingWishlistIds.map((w) => w.id)}`,
    with: {
      products: {
        where: or(
          ilike(products.name, `%${sanitizedQuery}%`),
          ilike(products.description ?? "", `%${sanitizedQuery}%`),
        ),
      },
      wishlistShares: {
        where: eq(wishlistShares.sharedWithUserId, session.user.id),
      },
    },
  });

  return {
    wishlists: accessibleWishlists.map((wishlist) => ({
      ...wishlist,
      isOwner: wishlist.createdById === session.user.id,
      isShared: wishlist.wishlistShares.length > 0,
    })),
  };
};
