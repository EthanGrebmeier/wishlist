import React from "react";
import { getAllWishlists } from "~/lib/wishlist/getWishlist";
import WishlistList from ".";

const MyWishlists = async () => {
  const wishlists = await getAllWishlists({ limit: 24 });
  return <WishlistList wishlists={wishlists} />;
};

export default MyWishlists;
