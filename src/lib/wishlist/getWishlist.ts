import { and, desc, eq, exists, not, notExists } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  productReceipts,
  wishlistShares,
  wishlists,
} from "~/server/db/schema/wishlist";

export const getMyGifts = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return db.query.products.findMany({
    where: ({ id }, { eq }) =>
      exists(
        db
          .select()
          .from(productReceipts)
          .where(({ productId, createdById }) =>
            and(eq(id, productId), eq(createdById, session.user.id)),
          ),
      ),
  });
};

export const getWishlist = async ({ wishlistId }: { wishlistId: string }) => {
  const session = await getServerAuthSession();

  const selectedWishlist = await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
    with: {
      products: {
        where: ({ id }) =>
          notExists(
            db
              .select()
              .from(productReceipts)
              .where(({ productId }) => eq(productId, id)),
          ),
        with: {
          commitments: {
            with: {
              user: true,
            },
          },
        },
      },
      wishlistShares: true,
    },
  });

  const isEditor =
    selectedWishlist?.wishlistShares.some(
      (share) =>
        share.sharedWithUserId === session?.user.id && share.type === "editor",
    ) ?? session?.user.id === selectedWishlist?.createdById;

  if (selectedWishlist?.isSecret && isEditor) {
    return {
      ...selectedWishlist,
      products: selectedWishlist.products.map((product) => ({
        ...product,
        commitments: [],
      })),
      canEdit: isEditor,
      isOwner: session?.user.id === selectedWishlist.createdById,
    };
  }

  if (!selectedWishlist) {
    throw new Error(`No wishlist found by ID ${wishlistId}`);
  }

  return {
    ...selectedWishlist,
    canEdit: isEditor,
    isOwner: session?.user.id === selectedWishlist.createdById,
  };
};

type getWishlistsArgs = {
  limit?: number;
  editableOnly?: boolean;
};

export const getAllWishlists = async (config?: getWishlistsArgs) => {
  const myWishlists = await getUserWishlists(config);
  const sharedWishlists = await getSharedWishlists(config);
  return [...myWishlists, ...sharedWishlists];
};

export const getUserWishlists = async (config?: getWishlistsArgs) => {
  const userSession = await getServerAuthSession();

  if (!userSession) {
    redirect("/");
  }

  const userWishlists = await db.query.wishlists.findMany({
    where: eq(wishlists.createdById, userSession.user.id),
    with: {
      products: true,
    },
    orderBy: desc(wishlists.updatedAt),
    limit: config?.limit,
  });

  return userWishlists.map((wishlist) => ({
    ...wishlist,
    canEdit: true,
    isOwner: true,
  }));
};

export const getSharedWishlists = async (config?: getWishlistsArgs) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const sharedLists = await db.query.wishlistShares.findMany({
    where: and(
      and(
        eq(wishlistShares.sharedWithUserId, session.user.id),
        not(eq(wishlistShares.type, "invitee")),
      ),
      not(eq(wishlistShares.createdById, session.user.id)),
    ),
    with: {
      wishlist: {
        with: {
          products: true,
        },
      },
    },
    limit: config?.limit,
  });

  if (config?.editableOnly) {
    return sharedLists
      .filter((share) => share.type === "editor")
      .map((list) => ({
        ...list.wishlist,
        canEdit: true,
        isOwner: list.wishlist.createdById === session.user.id,
      }));
  }

  return sharedLists
    .map((list) => ({
      ...list.wishlist,
      canEdit: list.type === "editor",
      isOwner: list.wishlist.createdById === session.user.id,
    }))
    .filter(Boolean);
};
