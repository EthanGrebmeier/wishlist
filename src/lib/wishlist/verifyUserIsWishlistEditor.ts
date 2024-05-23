import type { Session } from "next-auth";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";

type verifyUserIsWishlistEditorArgs = {
  wishlist: Wishlist;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

export const verifyUserIsWishlistEditor = ({
  wishlist,
  wishlistShares,
  session,
}: verifyUserIsWishlistEditorArgs) => {
  if (wishlist.createdById === session.user.id) {
    return true;
  }

  const userIsSharedEditor = Boolean(
    wishlistShares.find(
      (share) =>
        share.sharedWithUserId === session.user.id && share.type === "editor",
    ),
  );

  return userIsSharedEditor;
};
