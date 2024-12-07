import { Scroll } from "lucide-react";
import { Suspense } from "react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import TitleBar from "~/components/ui/title-bar";
import { DeleteWishlistSheet } from "~/components/wishlist/delete-wishlist-sheet";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getAllWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  return (
    <>
      <TitleBar wrapperClassName="sticky top-[72px] md:top-0 md:relative">
        <span className="flex items-center justify-center gap-4 pl-2">
          <ColoredIconWrapper>
            <Scroll size="25" />
          </ColoredIconWrapper>
          <TitleBar.Title>My Wishlists</TitleBar.Title>{" "}
        </span>
      </TitleBar>
      <Suspense>
        <WishlistGrid getWishlists={getAllWishlists} />
      </Suspense>
      <DeleteWishlistSheet />
    </>
  );
};

export default WishlistPage;
