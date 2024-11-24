import { redirect } from "next/navigation";
import { Suspense } from "react";
import Product from "~/components/wishlist/product";
import ProductLoading from "~/components/wishlist/product/loading";
import AddProduct from "~/components/wishlist/wishlist/add-product";
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
      <div className="flex w-full flex-1 justify-center xl:pt-8">
        <Product
          isSecret={wishlist.isSecret}
          wishlist={wishlist}
          product={product}
        />
      </div>
      <AddProduct wishlistId={wishlist.id} />
    </Suspense>
  );
};

export default ProductViewPage;
