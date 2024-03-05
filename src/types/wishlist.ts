import type { z } from "zod";
import type { getWishlist } from "~/lib/wishlist/getWishlist";
import type { getProduct } from "~/lib/wishlist/product/getProduct";
import type { privacyTypeSchema } from "~/schema/wishlist/wishlist";

export type Wishlist = Awaited<ReturnType<typeof getWishlist>>;

export type WishlistProduct = Awaited<ReturnType<typeof getProduct>>;

export type WishlistPrivacy = z.infer<typeof privacyTypeSchema>;
