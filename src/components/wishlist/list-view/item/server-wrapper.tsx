import React from "react";
import ListItem from ".";
import type { Session } from "next-auth";
import type { WishlistWithProducts } from "~/types/wishlist";

type ListItemServerWrapperProps = {
  session: Session;
  wishlist: WishlistWithProducts;
  animationDelay?: number;
};

const ListItemServerWrapper = ({
  session,
  wishlist,
  animationDelay,
}: ListItemServerWrapperProps) => {
  return (
    <ListItem
      wishlist={wishlist}
      canUserEdit={wishlist.canEdit}
      isOwner={wishlist.isOwner}
      animationDelay={animationDelay}
    />
  );
};

export default ListItemServerWrapper;
