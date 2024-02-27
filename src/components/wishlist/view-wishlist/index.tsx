import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const wishlist = await getWishlist({ wishlistId });

  return (
    <div className="max-h-screen overflow-y-auto  py-6">
      <div className="mb-8 flex justify-between gap-4 border-b-2 border-black px-6 pb-4">
        <h1 className="text-4xl font-medium">{wishlist.name} </h1>
        <AddProduct wishlistId={wishlistId} />
      </div>
      <section className="px-6">
        <ProductList products={wishlist.products} />
      </section>
    </div>
  );
};

export default ViewWishlist;
