import { atom } from "jotai";
import type { wishlistSettingsSchema } from "~/schema/wishlist/wishlist";
import type { z } from "zod";
export const isWishlistSettingsOpenAtom = atom(false);
export const wishlistToEditAtom = atom<z.infer<
  typeof wishlistSettingsSchema
> | null>(null);
