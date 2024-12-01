import { atom } from "jotai";
import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";

export const productToViewAtom =
  atom<WishlistProductWithCommitmentsWithUser | null>(null);
export const isProductViewOpenAtom = atom<boolean>(false);
