import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import ProductMenu from "./menu";
import MenuProvider from "./menu/menuProvider";
import ProductImage from "./image";
import Link from "~/components/ui/link";
import { getProductSlug } from "~/lib/wishlist/product/getProductSlug";

type ProductProps = {
  product: WishlistProductWithCommitmentsWithUser;
  isEditor: boolean;
};

const Product = ({ product, isEditor }: ProductProps) => {
  return (
    <li className="relative isolate overflow-hidden rounded-md border-2 border-black">
      {isEditor && (
        <MenuProvider product={product} wishlistId={product.wishlistId}>
          <div className="absolute right-2 top-2 z-10">
            <ProductMenu />
          </div>
        </MenuProvider>
      )}
      <Link href={getProductSlug(product)} className="w-full ">
        <div className="relative aspect-square w-full overflow-hidden bg-background ">
          {!!product.commitments.length && (
            <div className="absolute left-2 top-2 z-10 rounded-md border-2 border-black bg-green-300 p-1 font-medium ">
              <p className="text-sm font-medium text-black"> Purchased </p>
            </div>
          )}
          <ProductImage imageUrl={product.image} />
        </div>

        <div className="flex w-full items-center justify-between gap-4 border-t-2 border-black bg-green-200 px-2 py-2">
          <p className="font-serif text-2xl"> {product.name} </p>
          {product.price && (
            <p className="text-md font-medium"> ${product.price} </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default Product;
