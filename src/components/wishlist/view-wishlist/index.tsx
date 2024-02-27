import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const wishlist = await getWishlist({ wishlistId });

  return (
    <div className="max-h-screen overflow-y-auto  py-6">
      <div className="mb-8 flex justify-between gap-4 border-b-2 border-black px-6 pb-4">
        <h1 className="text-4xl font-medium">{wishlist.name} </h1>
        <Button asChild variant="outline">
          <Link
            href={`/wishlist/${wishlistId}/add-product`}
            className="gap-x-4"
          >
            <PlusIcon width="20" height="20" />
            <span> Add Product </span>
          </Link>
        </Button>
      </div>
      <section className="px-6">
        <ProductList products={wishlist.products} />
      </section>
    </div>
  );
};

export default ViewWishlist;
