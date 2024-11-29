import { atom } from "jotai";
import { wishlistSettingsSchema } from "~/schema/wishlist/wishlist";
import { z } from "zod";
export const isWishlistSettingsOpenAtom = atom(false);
export const wishlistToEditAtom = atom<z.infer<
  typeof wishlistSettingsSchema
> | null>(null);
