import { BookUser } from "lucide-react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import TitleBar from "~/components/ui/title-bar";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";

const SharedWishlistPage = async () => {
  return (
    <div className="w-full h-full">
      <TitleBar>
        <span className="flex items-center gap-4 pl-2">
          <ColoredIconWrapper className="bg-yellow-300">
            <BookUser size="25" />
          </ColoredIconWrapper>
          <TitleBar.Title> Shared Wishlists</TitleBar.Title>
        </span>
      </TitleBar>
      <WishlistGrid getWishlists={getSharedWishlists} />
    </div>
  );
};

export default SharedWishlistPage;
