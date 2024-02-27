import { eq } from "drizzle-orm";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { wishlists } from "~/server/db/schema/wishlist";

export const getWishlist = async ({ wishlistId }: { wishlistId: string }) => {
  const selectedWishlist = await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
    with: {
      products: true,
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
