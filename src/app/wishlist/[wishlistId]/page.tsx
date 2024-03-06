import { Suspense } from "react";
import ViewWishlist from "~/components/wishlist/wishlist";

type WishlistViewPageProps = {
  params: {
    wishlistId: string;
  };
};

const WishlistViewPage = async ({ params }: WishlistViewPageProps) => {
  return (
    <Suspense fallback="Loading...">
      <ViewWishlist wishlistId={params.wishlistId} />
    </Suspense>
  );
};

export default WishlistViewPage;
