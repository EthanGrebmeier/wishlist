import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { wishlistShares } from "~/server/db/schema/wishlist";

type getSharedUsersArgs = {
  wishlistId: string;
};
export const getSharedUsers = async ({ wishlistId }: getSharedUsersArgs) => {
  const shares = await db.query.wishlistShares.findMany({
    where: eq(wishlistShares.wishlistId, wishlistId),
    with: {
      users: true,
    },
  });

  return shares.map((share) => share.users);
};
