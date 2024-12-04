import React from "react";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";
import WishlistList from ".";

const SharedWishlists = async () => {
  const wishlists = await getSharedWishlists({ limit: 12 });
  return <WishlistList wishlists={wishlists} />;
};

export default SharedWishlists;
