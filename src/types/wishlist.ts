import type { z } from "zod";
import type { privacyTypeSchema } from "~/schema/wishlist/wishlist";
import type {
  productCommitments,
  products,
  wishlistShares,
  wishlists,
} from "~/server/db/schema/wishlist";
import type { User } from "./user";

export type Wishlist = typeof wishlists.$inferSelect;

export interface WishlistWithProducts extends Wishlist {
  products: WishlistProduct[];
}

export type WishlistProduct = typeof products.$inferSelect;

export interface WishlistProductWithCommitmentsWithUser
  extends WishlistProduct {
  commitments: WishlistProductCommitmentsWithUser[];
}

export type WishlistProductCommitments = typeof productCommitments.$inferSelect;
export interface WishlistProductCommitmentsWithUser
  extends WishlistProductCommitments {
  user: User;
}

export type WishlistShares = typeof wishlistShares.$inferSelect;
export interface WishlistSharesWithUser extends WishlistShares {
  users: User;
}
export type WishlistPrivacy = z.infer<typeof privacyTypeSchema>;
