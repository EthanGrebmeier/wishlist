import { getServerAuthSession } from "~/server/auth";
import type { WishlistWithProducts } from "~/types/wishlist";
import ListView from ".";

type WishlistGridProps = {
  getWishlists: () => Promise<WishlistWithProducts[]>;
};

const WishlistGrid = async ({ getWishlists }: WishlistGridProps) => {
  const [wishlists, session] = await Promise.all([
    getWishlists(),
    getServerAuthSession(),
  ]);

  if (!session) {
    return null;
  }

  return <ListView wishlists={wishlists} session={session} />;
};

export default WishlistGrid;
