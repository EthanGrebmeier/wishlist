import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import ShareWishlist from "../share-wishlist";
import { getServerAuthSession } from "~/server/auth";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const [wishlist, session] = await Promise.all([
    getWishlist({ wishlistId }),
    getServerAuthSession(),
  ]);
  const isEditor = session?.user.id === wishlist.createdById;

  return (
    <div className="grid max-h-screen grid-rows-[auto_1fr] overflow-y-auto py-6">
      <div className="mb-8 flex justify-between gap-4 px-6 pb-4">
        <h1 className="text-4xl font-medium">{wishlist.name} </h1>
        <div className="flex space-x-4">
          {isEditor && <AddProduct wishlistId={wishlistId} />}
          {isEditor && (
            <ShareWishlist
              wishlistId={wishlistId}
              privacyType={wishlist.privacyType}
            />
          )}
        </div>
      </div>
      <section className="overflow-y-auto px-6">
        <ProductList isEditor={isEditor} products={wishlist.products} />
      </section>
    </div>
  );
};

export default ViewWishlist;
