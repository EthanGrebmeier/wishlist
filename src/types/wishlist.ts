import type { z } from "zod";
import type { privacyTypeSchema } from "~/schema/wishlist/wishlist";
import type {
  productCommitments,
  products,
  wishlists,
} from "~/server/db/schema/wishlist";
import type { User } from "./user";

export type Wishlist = typeof wishlists.$inferSelect;
export type WishlistWithProducts = Wishlist & {
  products: WishlistProduct[];
};

export type WishlistProduct = typeof products.$inferSelect;

export type WishlistProductWithCommitmentsWithUser = WishlistProduct & {
  commitments: WishlistProductCommitmentsWithUser[];
};

export type WishlistProductCommitments = typeof productCommitments.$inferSelect;
export type WishlistProductCommitmentsWithUser = WishlistProductCommitments & {
  user: User;
};

export type WishlistPrivacy = z.infer<typeof privacyTypeSchema>;
