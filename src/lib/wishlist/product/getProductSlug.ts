import type { WishlistProduct } from "~/types/wishlist";

export const getProductSlug = (product: WishlistProduct) => {
  return `/product/${product.id}`;
};
