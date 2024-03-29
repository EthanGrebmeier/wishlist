import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import ShareWishlist from "../share-wishlist";
import { getServerAuthSession } from "~/server/auth";
import TitleBar from "~/components/ui/title-bar";
import TitleDisplay from "./settings/title-display";
import WishlistSettings from "./settings";

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
    <div className=" w-full grid-rows-[auto_1fr] pt-4 sm:grid md:relative md:max-h-screen md:overflow-y-auto lg:pt-8">
      <TitleBar className="sticky top-20 w-full flex-wrap items-start gap-2 md:relative md:top-0 md:flex-row md:items-center md:gap-0">
        <TitleDisplay
          isEditor={isEditor}
          wishlist={wishlist}
          title={wishlist.name}
        />
        <div className="xs:w-fit -mx-6 flex w-screen flex-nowrap space-x-4 overflow-x-auto px-6 md:mx-0 md:px-0">
          {isEditor && <AddProduct wishlistId={wishlistId} />}
          {isEditor && (
            <ShareWishlist
              wishlistId={wishlistId}
              userId={session.user.id}
              privacyType={wishlist.privacyType}
            />
          )}
          {isEditor && <WishlistSettings wishlist={wishlist} />}
        </div>
      </TitleBar>
      <section className="overflow-y-auto px-6 py-4">
        <ProductList isEditor={isEditor} products={wishlist.products} />
      </section>
    </div>
  );
};

export default ViewWishlist;
