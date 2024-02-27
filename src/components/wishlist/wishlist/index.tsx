import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import ShareWishlist from "../share-wishlist";
import { getServerAuthSession } from "~/server/auth";
import TitleBar from "~/components/ui/title-bar";
import TitleDisplay from "./settings/title-display";
import EditWishlist from "./edit-wishlist";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const [wishlist, session] = await Promise.all([
    getWishlist({ wishlistId }),
    getServerAuthSession(),
  ]);

  if (!session) {
    return;
  }

  const isEditor = session.user.id === wishlist.createdById;

  return (
    <div className="grid max-h-screen grid-rows-[auto_1fr] overflow-y-auto pt-4 lg:pt-8">
      <TitleBar>
        <TitleDisplay
          isEditor={isEditor}
          wishlist={wishlist}
          title={wishlist.name}
        />
        <div className="flex gap-4 lg:flex-row">
          {isEditor && <AddProduct wishlistId={wishlistId} />}
          {isEditor && (
            <ShareWishlist
              wishlistId={wishlistId}
              userId={session.user.id}
              privacyType={wishlist.privacyType}
            />
          )}
          {isEditor && <EditWishlist wishlist={wishlist} />}
        </div>
      </TitleBar>
      <section className="overflow-y-auto px-6 pt-4 ">
        <ProductList isEditor={isEditor} products={wishlist.products} />
      </section>
    </div>
  );
};

export default ViewWishlist;
