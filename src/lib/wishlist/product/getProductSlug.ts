import type { WishlistProduct } from "~/types/wishlist";

export const getProductSlug = (product: WishlistProduct) => {
  return `/wishlist/${product.wishlistId}/${product.id}`;
};
