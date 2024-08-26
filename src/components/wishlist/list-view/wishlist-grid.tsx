import { getServerAuthSession } from "~/server/auth";
import type { WishlistWithProducts } from "~/types/wishlist";
import ListView from ".";
import ListItemServerWrapper from "./item/server-wrapper";
import { Frown } from "lucide-react";

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

  return (
    <ListView>
      {wishlists.length ? (
        wishlists.map((wishlist, index) => (
          <ListItemServerWrapper
            session={session}
            wishlist={wishlist}
            key={wishlist.id}
            animationDelay={index * 0.1}
          />
        ))
      ) : (
        <div className="flex gap-4">
          <p className="font-serif text-3xl"> No wishlists found </p>
          <Frown size={30} />
        </div>
      )}
    </ListView>
  );
};

export default WishlistGrid;
