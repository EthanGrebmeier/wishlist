import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import ShareWishlist from "../share-wishlist";
import { getServerAuthSession } from "~/server/auth";
import TitleBar from "~/components/ui/title-bar";
import WishlistSettings from "./settings";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { cn, getBackgroundColor } from "~/lib/utils";

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
    <>
      <div className=" grid h-full w-full grid-rows-[auto_1fr] md:relative md:max-h-screen md:overflow-y-auto md:pt-4 lg:pt-8">
        <TitleBar
          wrapperClassName="sticky top-[72px] md:top-0 md:relative"
          className=" w-full flex-wrap gap-2 md:flex-row md:gap-0"
        >
          <div className="flex flex-1 items-center gap-4 pl-2">
            <div
              className={cn(
                "flex h-6 w-6 flex-shrink-0 rounded-full border-2 border-black",
                getBackgroundColor(wishlist.color),
              )}
            ></div>
            <TitleBar.Title>{wishlist.name}</TitleBar.Title>
          </div>
          <div className="flex flex-nowrap space-x-1 overflow-x-auto xs:w-fit md:space-x-4 md:px-0 ">
            {isEditor && (
              <div className="hidden md:block">
                {" "}
                <AddProduct wishlistId={wishlistId} />{" "}
              </div>
            )}
            {isEditor && (
              <div className="hidden md:block">
                <ShareWishlist
                  sharedUsers={sharedUsers}
                  wishlistId={wishlistId}
                  userId={session.user.id}
                  privacyType={wishlist.privacyType}
                />
              </div>
            )}
            {isEditor && <WishlistSettings wishlist={wishlist} />}
          </div>
        </TitleBar>
        <section className="overflow-y-auto px-2 py-4 md:px-6">
          {wishlist.products.length ? (
            <ProductList isEditor={isEditor} products={wishlist.products} />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-8">
              {isEditor ? (
                <div className="flex w-fit flex-col items-center justify-center gap-4">
                  <p className="text-balance text-center font-serif text-3xl font-medium md:text-4xl">
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
      {isEditor && (
        <AddProduct
          wishlistId={wishlistId}
          trigger={
            <Button
              icon={<PlusIcon size={20} />}
              className="fixed bottom-4 left-1 z-10 flex h-11 w-11 rounded-full border-2 border-black bg-green-200 p-2  md:hidden"
            />
          }
        />
      )}
    </>
  );
};

export default ViewWishlist;
