import React from "react";
import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import WishlistList from ".";

const MyWishlists = async () => {
  const wishlists = await getUserWishlists();
  return <WishlistList wishlists={wishlists} />;
};

export default MyWishlists;
