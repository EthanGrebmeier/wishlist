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

type ProductProps = {
  product: WishlistProduct;
  wishlist: WishlistWithProducts;
  isSecret: boolean;
};

const ProductServer = async ({ product, wishlist, isSecret }: ProductProps) => {
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
    <Product
      canUserEdit={canUserEdit}
      session={session}
      wishlist={wishlist}
      product={product}
      productCommitments={productCommitments?.data}
      sharedUsers={wishlistShares}
    />
  );
};

export default ProductServer;
