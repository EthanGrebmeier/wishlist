import React from "react";
import ListItem from ".";
import { getSharedUserType } from "~/lib/wishlist/getSharedUsers";
import type { Session } from "next-auth";
import type { WishlistWithProducts } from "~/types/wishlist";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";

type ListItemServerWrapperProps = {
  session: Session;
  wishlist: WishlistWithProducts;
  animationDelay?: number;
};

const ListItemServerWrapper = async ({
  session,
  wishlist,
  animationDelay,
}: ListItemServerWrapperProps) => {
  const wishlistShareType = await getSharedUserType({
    wishlistId: wishlist.id,
    session,
  });

  if (!wishlistShareType) {
    // Somehow caught a state where this list is no longer shared with the user
    return null;
  }

  const canUserEdit = wishlist.createdById === session.user.id;

  return (
    <ListItem
      wishlist={wishlist}
      canUserEdit={canUserEdit}
      userType={wishlistShareType}
      animationDelay={animationDelay}
    />
  );
};

export default ListItemServerWrapper;
