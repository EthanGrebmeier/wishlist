import type { z } from "zod";
import type { getWishlist } from "~/lib/wishlist/getWishlist";
import type { privacyTypeSchema } from "~/schema/wishlist/wishlist";
import type { productCommitments, products } from "~/server/db/schema/wishlist";
import type { User } from "./user";

export type Wishlist = Awaited<ReturnType<typeof getWishlist>>;

export type WishlistProduct = typeof products.$inferSelect;

export type WishlistProductWithCommitmentsWithUser = WishlistProduct & {
  commitments: WishlistProductCommitmentsWithUser[];
};

export type WishlistProductCommitments = typeof productCommitments.$inferSelect;
export type WishlistProductCommitmentsWithUser = WishlistProductCommitments & {
  user: User;
};

export type WishlistPrivacy = z.infer<typeof privacyTypeSchema>;
