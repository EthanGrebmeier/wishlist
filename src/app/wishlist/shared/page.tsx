import { BookUser } from "lucide-react";
import TitleBar from "~/components/ui/title-bar";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  return (
    <div className="max-h-full overflow-y-auto py-8">
      <TitleBar>
        <span className="flex items-center gap-4">
          <TitleBar.Title> Shared Wishlists</TitleBar.Title>
          <BookUser className="-mt-1" size={20} />
        </span>
      </TitleBar>
      <WishlistGrid getWishlists={getSharedWishlists} />
    </div>
  );
};

export default WishlistPage;
