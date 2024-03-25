import { Suspense } from "react";
import ViewWishlist from "~/components/wishlist/wishlist";
import WishlistLoading from "~/components/wishlist/wishlist/loading";

type WishlistViewPageProps = {
  params: {
    wishlistId: string;
  };
};

const WishlistViewPage = async ({ params }: WishlistViewPageProps) => {
  return (
    <Suspense fallback={<WishlistLoading />}>
      <ViewWishlist wishlistId={params.wishlistId} />
    </Suspense>
  );
};

export default WishlistViewPage;
