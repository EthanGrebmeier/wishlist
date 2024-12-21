import { getAllWishlists } from "~/lib/wishlist/getWishlist";
import { FilteredWishlistGrid } from "./filtered-wishlist-grid";

export const WishlistGridWrapper = async () => {
  const wishlists = await getAllWishlists();

  return <FilteredWishlistGrid wishlists={wishlists} />;
};
