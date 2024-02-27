import { and, eq, not } from "drizzle-orm";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { wishlistShares, wishlists } from "~/server/db/schema/wishlist";

export const getWishlist = async ({ wishlistId }: { wishlistId: string }) => {
  const selectedWishlist = await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
    with: {
      products: {
        with: {
          commitments: {
            with: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!selectedWishlist) {
    throw new Error(`No wishlist found by ID ${wishlistId}`);
  }

  return selectedWishlist;
};

export const getUserWishlists = async () => {
  const userSession = await getServerAuthSession();

  if (!userSession) {
    throw new Error("No user session");
  }

  return db.query.wishlists.findMany({
    where: eq(wishlists.createdById, userSession.user.id),
    with: {
      products: true,
    },
  });
};

export const getSharedWishlists = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("No user session");
  }

  const sharedLists = await db.query.wishlistShares.findMany({
    where: and(
      eq(wishlistShares.sharedWithUserId, session.user.id),
      not(eq(wishlistShares.createdById, session.user.id)),
    ),
    with: {
      wishlist: {
        with: {
          products: true,
        },
      },
    },
  });

  return sharedLists.map((list) => list.wishlist).filter(Boolean);
};
