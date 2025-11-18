import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductServer from "~/components/wishlist/product/product-server";
import ProductLoading from "~/components/wishlist/product/loading";
import AddProduct from "~/components/wishlist/wishlist/add-product";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { getProduct } from "~/lib/wishlist/product/getProduct";

type ProductViewPageProps = {
  params: {
    productId: string;
  };
};

// Disable caching to ensure fresh data on every visit
export const dynamic = 'force-dynamic';

const ProductViewPage = async ({ params }: ProductViewPageProps) => {
  const { productId } = params;

  const product = await getProduct({ productId });
  if (!product) {
    redirect("/");
  }
  const wishlist = await getWishlist({ wishlistId: product?.wishlistId });

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductServer wishlist={wishlist} product={product} />
      <AddProduct wishlistId={wishlist.id} />
    </Suspense>
  );
};

export default ProductViewPage;
