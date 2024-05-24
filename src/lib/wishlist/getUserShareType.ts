import type { Session } from "next-auth";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";

type getUserShareTypeArgs = {
  wishlist: Wishlist;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

export const getUserShareType = ({
  wishlist,
  wishlistShares,
  session,
}: getUserShareTypeArgs) => {
  if (wishlist.createdById === session.user.id) {
    return "owner";
  }

  for (const share of wishlistShares) {
    if (share.sharedWithUserId === session.user.id) {
      return share.type;
    }
  }

  throw new Error("Wishlist is not shared with user");
};
