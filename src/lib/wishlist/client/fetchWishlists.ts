import { wishlistSchema } from "~/schema/wishlist/wishlist";
import { z } from "zod";
export const fetchWishlists = async () => {
  const response = await fetch("/api/wishlist");
  const data: unknown = await response.json();
  return z.array(wishlistSchema).parse(data);
};
