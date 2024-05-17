import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { magicWishlistLinks } from "~/server/db/schema/wishlist";

export const getWishlistByMagicLink = async ({
  magicLinkId,
}: {
  magicLinkId: string;
}) => {
  // get entry associated with magic link
  const magicLinkEntry = await db.query.magicWishlistLinks.findFirst({
    where: eq(magicWishlistLinks.id, magicLinkId),
  });

  if (!magicLinkEntry) {
    return {
      message: "Invalid magic link",
    };
  }

  return magicLinkEntry;
};
