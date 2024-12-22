import { Suspense } from "react";
import { DeleteWishlistSheet } from "~/components/wishlist/delete-wishlist-sheet";
import { WishlistGridWrapper } from "~/components/wishlist/list-view/wishlist-grid-wrapper";
import { WishlistIndexHeader } from "~/components/wishlist/wishlist-index-header";

const WishlistPage = async () => {
  return (
    <>
      <WishlistIndexHeader />
      <Suspense>
        <WishlistGridWrapper />
      </Suspense>
      <DeleteWishlistSheet />
    </>
  );
};

export default WishlistPage;
