import { Scroll } from "lucide-react";
import { Suspense } from "react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import TitleBar from "~/components/ui/title-bar";
import { DeleteWishlistSheet } from "~/components/wishlist/delete-wishlist-sheet";
import { WishlistGridWrapper } from "~/components/wishlist/list-view/wishlist-grid-wrapper";

const WishlistPage = async () => {
  return (
    <>
      <TitleBar wrapperClassName="sticky top-[72px] md:top-0 md:relative">
        <span className="flex items-center justify-center gap-4 pl-2">
          <ColoredIconWrapper>
            <Scroll size="25" />
          </ColoredIconWrapper>
          <TitleBar.Title>Wishlists</TitleBar.Title>{" "}
        </span>
      </TitleBar>
      <Suspense>
        <WishlistGridWrapper />
      </Suspense>
      <DeleteWishlistSheet />
    </>
  );
};

export default WishlistPage;
