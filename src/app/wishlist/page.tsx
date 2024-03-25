import { Scroll } from "lucide-react";
import { Suspense } from "react";
import TitleBar from "~/components/ui/title-bar";
import CreateWishlist from "~/components/wishlist/create-wishlist";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getUserWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  return (
    <div className="h-full max-h-full overflow-y-auto py-4 lg:py-8">
      <TitleBar>
        <span className="flex items-center gap-4">
          <TitleBar.Title>My Wishlists </TitleBar.Title>{" "}
          <Scroll className="-mt-1" size="20" />
        </span>
        <CreateWishlist />
      </TitleBar>
      <Suspense>
        <WishlistGrid getWishlists={getUserWishlists} />
      </Suspense>
    </div>
  );
};

export default WishlistPage;
