import { and, eq } from "drizzle-orm";
import type { Session } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { wishlists } from "~/server/db/schema/wishlist";

export type ServerActionResponse = {
  message: string;
} | null;

export const makeProtectedAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/");
    }

    return { session };
  },
});

export const checkUserIsWishlistEditor = async ({
  wishlistId,
  session,
}: {
  wishlistId: string;
  session: Session;
}) => {
  const wishlist = await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
    with: {
      wishlistShares: {
        where: ({ sharedWithUserId, type }) =>
          and(eq(sharedWithUserId, session.user.id), eq(type, "editor")),
      },
    },
  });

  if (!wishlist) {
    throw new Error("Access Denied");
  }

  return wishlist;
};

export const makeSafeAction = createSafeActionClient();
