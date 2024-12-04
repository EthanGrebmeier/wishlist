import { getServerAuthSession } from "~/server/auth";
import type { WishlistWithProducts } from "~/types/wishlist";
import ListView from ".";
import ListItemServerWrapper from "./item/server-wrapper";
import { CreateWishlistButton } from "./create-wishlist-button";

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

  return wishlists.length ? (
    <ListView>
      {wishlists.map((wishlist, index) => (
        <ListItemServerWrapper
          session={session}
          wishlist={wishlist}
          key={wishlist.id}
          animationDelay={index * 0.1}
        />
      ))}
    </ListView>
  ) : (
    <div className="mt-24 flex w-full flex-col items-center justify-center gap-4">
      <p className="font-serif text-3xl"> No wishlists found </p>
      <div className="flex flex-col gap-2">
        <p className="text-center text-lg">
          Let&apos;s create your first wishlist!
        </p>
        <CreateWishlistButton />
      </div>
    </div>
  );
};

export default WishlistGrid;
