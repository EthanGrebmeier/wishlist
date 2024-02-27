import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import CreateWishlist from "~/components/wishlist/create-wishlist";
import ListView from "~/components/wishlist/list-view";

const WishlistPage = () => {
  return (
    <div className="max-h-full overflow-y-auto py-6">
      <div className="mb-4 flex items-center justify-between border-b-2 border-black px-6 pb-4">
        <h1 className="text-4xl font-medium"> My Wishlists</h1>
        <CreateWishlist />
      </div>
      <div className="px-4 py-6">
        <ListView />
      </div>
    </div>
  );
};

export default WishlistPage;
