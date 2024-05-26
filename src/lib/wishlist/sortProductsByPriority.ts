import type { WishlistProduct } from "~/types/wishlist";

const priorityDict = {
  high: -1,
  normal: 0,
  low: 1,
};

export const sortProductsByPriority = (
  productA: WishlistProduct,
  productB: WishlistProduct,
) => {
  return priorityDict[productB.priority] - priorityDict[productA.priority];
};
