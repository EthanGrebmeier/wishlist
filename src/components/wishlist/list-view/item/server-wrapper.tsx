import React from "react";
import ListItem from ".";
import { getSharedUserType } from "~/lib/wishlist/getSharedUsers";
import type { Session } from "next-auth";
import type { WishlistWithProducts } from "~/types/wishlist";

type ListItemServerWrapperProps = {
  session: Session;
  wishlist: WishlistWithProducts;
};

const ListItemServerWrapper = async ({
  session,
  wishlist,
}: ListItemServerWrapperProps) => {
  const wishlistShare = await getSharedUserType({
    wishlistId: wishlist.id,
    session,
  });

  if (!wishlistShare) {
    // Somehow caught a state where this list is no longer shared with the user
    return null;
  }

  const isEditor =
    wishlistShare.type === "editor" || wishlist.createdById === session.user.id;

  return <ListItem wishlist={wishlist} isEditor={isEditor} />;
};

export default ListItemServerWrapper;
