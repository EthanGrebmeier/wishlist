
import { Suspense } from "react";
import ProductModal from "~/components/wishlist/product/product-modal";
import ViewWishlist from "~/components/wishlist/wishlist";
import AddProduct from "~/components/wishlist/wishlist/add-product";
import WishlistLoading from "~/components/wishlist/wishlist/loading";
import { getServerAuthSession } from "~/server/auth";

type WishlistViewPageProps = {
  params: {
    wishlistId: string;
  };
};

const WishlistViewPage = async ({ params }: WishlistViewPageProps) => {
  const session = await getServerAuthSession();
  return (
    <Suspense fallback={<WishlistLoading />}>
      <ViewWishlist wishlistId={params.wishlistId} />
      <AddProduct wishlistId={params.wishlistId} />
      <ProductModal session={session} />
    </Suspense>
  );
};

export default WishlistViewPage;
