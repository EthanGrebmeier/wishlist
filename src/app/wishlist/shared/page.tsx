import { BookUser } from "lucide-react";
import TitleBar from "~/components/ui/title-bar";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  return (
    <div className="max-h-full overflow-y-auto py-8">
      <TitleBar>
        <span className="flex items-center gap-4 pl-2">
          <BookUser size={25} />
          <TitleBar.Title> Shared Wishlists</TitleBar.Title>
        </span>
      </TitleBar>
      <WishlistGrid getWishlists={getSharedWishlists} />
    </div>
  );
};

export default WishlistPage;
