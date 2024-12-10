import type { WishlistProduct, WishlistWithProducts } from "~/types/wishlist";
import {
  getProductCommitments,
  getProductReceipts,
} from "~/server/actions/product";
import { getServerAuthSession } from "~/server/auth";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";
import { getUserShareType } from "~/lib/wishlist/getUserShareType";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import Product from "./product";
import WishlistHeader from "../wishlist/header";
import ProductWishlistHeader from "./product-wishlist-header";

type ProductProps = {
  product: WishlistProduct;
  wishlist: WishlistWithProducts;
};

const ProductServer = async ({ product, wishlist }: ProductProps) => {
  const [productCommitments, productReceipts, wishlistShares, session] =
    await Promise.all([
      getProductCommitments({
        productId: product.id,
      }),
      getProductReceipts({
        productId: product.id,
      }),
      getSharedUsers({
        wishlistId: wishlist.id,
      }),
      getServerAuthSession(),
    ]);

  if (!session) {
    return null;
  }
  const userStatus = getUserShareType({
    wishlist,
    wishlistShares,
    session,
  });
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);

  return (
    <div className="flex w-full flex-col gap-4 ">
      <ProductWishlistHeader
        wishlist={wishlist}
        wishlistShares={wishlistShares}
      />
      <Product
        canUserEdit={canUserEdit}
        session={session}
        wishlist={wishlist}
        product={product}
        productCommitments={productCommitments?.data}
        productReceipts={productReceipts?.data}
        sharedUsers={wishlistShares}
      />
    </div>
  );
};

export default ProductServer;
