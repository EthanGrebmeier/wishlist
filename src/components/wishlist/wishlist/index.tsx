import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import ShareWishlist from "../share-wishlist";
import { getServerAuthSession } from "~/server/auth";
import TitleBar from "~/components/ui/title-bar";
import TitleDisplay from "./settings/title-display";
import WishlistSettings from "./settings";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const [wishlist, sharedUsers, session] = await Promise.all([
    getWishlist({ wishlistId }),
    getSharedUsers({ wishlistId }),
    getServerAuthSession(),
  ]);

  const isEditor = session?.user.id === wishlist.createdById;

  return (
    <div className=" grid h-full w-full grid-rows-[auto_1fr] pt-4 md:relative md:max-h-screen md:overflow-y-auto lg:pt-8">
      <TitleBar className="sticky top-20 w-full flex-wrap items-start gap-2 md:relative md:top-0 md:flex-row md:items-center md:gap-0">
        <TitleDisplay
          isEditor={isEditor}
          wishlist={wishlist}
          title={wishlist.name}
        />
        <div className="-mx-6 flex w-screen flex-nowrap space-x-4 overflow-x-auto px-6 pb-4 xs:w-fit md:mx-0 md:px-0 md:pb-0">
          {isEditor && <AddProduct wishlistId={wishlistId} />}
          {isEditor && (
            <ShareWishlist
              sharedUsers={sharedUsers}
              wishlistId={wishlistId}
              userId={session.user.id}
              privacyType={wishlist.privacyType}
            />
          )}
          {isEditor && <WishlistSettings wishlist={wishlist} />}
        </div>
      </TitleBar>
      <section className="overflow-y-auto px-6 py-4">
        {wishlist.products.length ? (
          <ProductList isEditor={isEditor} products={wishlist.products} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            {isEditor ? (
              <div className="flex w-fit flex-col items-center justify-center gap-4">
                <p className="text-center font-serif text-3xl font-medium md:text-4xl">
                  {" "}
                  Let&apos;s add your first product!
                </p>
                <AddProduct wishlistId={wishlistId} />
              </div>
            ) : (
              <div>
                <p className="font-serif text-4xl font-medium">
                  {" "}
                  No products found...
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewWishlist;
