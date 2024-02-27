import type { Wishlist } from "~/types/wishlist";

export const getWishlistSlug = (wishlist: Wishlist) => {
  return `/wishlist/${wishlist.id}`;
};
