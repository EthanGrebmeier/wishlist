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
    <Link href={getProductSlug(product)}>
      <li className="w-full space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-md">
          {isEditor && (
            <MenuProvider product={product} wishlistId={product.wishlistId}>
              <div className="absolute right-2 top-2">
                <ProductMenu />
              </div>
            </MenuProvider>
          )}
          {!!product.commitments.length && (
            <p className="absolute left-2 top-2 rounded-md border border-green-600 bg-green-200/60 px-2 py-1 text-sm text-green-600">
              Purchased
            </p>
          )}
          <ProductImage imageUrl={product.image} />
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <p className="text-xl font-medium"> {product.name} </p>
          {product.price && (
            <p className="text-md font-medium"> ${product.price} </p>
          )}
        </div>
      </li>
    </Link>
  );
};

export default Product;
