import { and, eq } from "drizzle-orm";
import { Session } from "next-auth";
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

  return shares;
};

interface getSharedUserTypeArgs extends getSharedUsersArgs {
  session: Session;
}

export const getSharedUserType = async ({
  wishlistId,
  session,
}: getSharedUserTypeArgs) => {
  const share = await db.query.wishlistShares.findFirst({
    where: and(
      eq(wishlistShares.wishlistId, wishlistId),
      eq(wishlistShares.sharedWithUserId, session.user.id),
    ),
    with: {
      users: true,
    },
  });

  return share;
};
