import type { productCommitments } from "~/server/db/schema/wishlist";
import type { Wishlist, WishlistProduct } from "./wishlist";

export type Commitment = typeof productCommitments.$inferSelect;

export interface CommitmentWithProduct extends Commitment {
  product: WishlistProduct;
  wishlist: Pick<Wishlist, "name" | "color" | "dueDate">;
}
