import type { getWishlist } from "~/lib/wishlist/getWishlist";
import type { getProduct } from "~/lib/wishlist/product/getProduct";

export type Wishlist = Awaited<ReturnType<typeof getWishlist>>;

export type Product = Awaited<ReturnType<typeof getProduct>>;
