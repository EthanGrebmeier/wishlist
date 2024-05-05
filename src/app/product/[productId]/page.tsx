import { redirect } from "next/navigation";
import { Suspense } from "react";
import Product from "~/components/wishlist/product";
import ProductLoading from "~/components/wishlist/product/loading";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { getProduct } from "~/lib/wishlist/product/getProduct";

type ProductViewPageProps = {
  params: {
    productId: string;
  };
};

const ProductViewPage = async ({ params }: ProductViewPageProps) => {
  const { productId } = params;

  const product = await getProduct({ productId });
  if (!product) {
    redirect("/");
  }
  const wishlist = await getWishlist({ wishlistId: product?.wishlistId });

  return (
    <Suspense fallback={<ProductLoading />}>
      <Product
        isSecret={wishlist.isSecret}
        wishlist={wishlist}
        product={product}
      />
    </Suspense>
  );
};

export default ProductViewPage;
