import { wishlistSchema } from "~/schema/wishlist/wishlist";
import { z } from "zod";

type FetchWishlistsArgs = {
  editableOnly?: boolean;
};

export const fetchWishlists = async ({
  editableOnly = false,
}: FetchWishlistsArgs) => {
  const response = await fetch(`/api/wishlist?editableOnly=${editableOnly}`);
  const data: unknown = await response.json();
  return z.array(wishlistSchema).parse(data);
};
