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
import { Tooltip } from "~/components/ui/tooltip";
import WishlistHeader from "./header";
import { redirect } from "next/navigation";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const [wishlist, sharedUsers, session] = await Promise.all([
    getWishlist({ wishlistId }),
    getSharedUsers({ wishlistId }),
    getServerAuthSession(),
  ]);

  if (
    !session ||
    !sharedUsers.find((sharedUser) => sharedUser.id === session.user.id)
  ) {
    redirect("/");
  }

  const isEditor = session?.user.id === wishlist.createdById;

  return (
    <>
      <div className=" relative h-full w-full">
        <WishlistHeader
          wishlist={wishlist}
          isEditor={isEditor}
          sharedUsers={sharedUsers}
          session={session}
        />
        <section className="px-2 py-4 md:px-6">
          {wishlist.products.length ? (
            <ProductList isEditor={isEditor} products={wishlist.products} />
          ) : (
            <div className="mt-24 flex h-full w-full flex-col items-center justify-center gap-8">
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
