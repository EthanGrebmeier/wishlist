import { wishlistSchema } from "~/schema/wishlist/wishlist";
import { z } from "zod";
export const fetchWishlists = async () => {
  const response = await fetch("/api/wishlist");
  const data: unknown = await response.json();
  console.log(data);
  return z.array(wishlistSchema).parse(data);
};
