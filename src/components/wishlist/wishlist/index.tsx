import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { AddProduct } from "./add-product";
import { getServerAuthSession } from "~/server/auth";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import WishlistHeader from "./header";
import { redirect } from "next/navigation";
import { getUserShareType } from "~/lib/wishlist/getUserShareType";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";

type ViewWishlistProps = {
  wishlistId: string;
};

const ViewWishlist = async ({ wishlistId }: ViewWishlistProps) => {
  const [wishlist, wishlistShares, session] = await Promise.all([
    getWishlist({ wishlistId }),
    getSharedUsers({ wishlistId }),
    getServerAuthSession(),
  ]);

  if (
    !session ||
    !wishlistShares.find(
      ({ users: sharedUser }) => sharedUser.id === session.user.id,
    )
  ) {
    redirect("/");
  }

  const userStatus = getUserShareType({
    wishlist,
    wishlistShares,
    session,
  });
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);

  return (
    <>
      <div className=" relative h-full w-full">
        <WishlistHeader
          wishlist={wishlist}
          userStatus={userStatus}
          wishlistShares={wishlistShares}
          session={session}
        />
        <section className="px-2 py-4 md:px-6">
          {wishlist.products.length ? (
            <ProductList
              wishlistColor={wishlist.color}
              canUserEdit={canUserEdit}
              products={wishlist.products}
            />
          ) : (
            <div className="mt-24 flex h-full w-full flex-col items-center justify-center gap-8">
              {canUserEdit ? (
                <div className="flex w-fit flex-col items-center justify-center gap-4">
                  <p className="text-balance text-center font-serif text-3xl font-medium md:text-4xl">
                    {" "}
                    Let&apos;s add your first product!
                  </p>
                  <AddProduct
                    shouldDefaultOpen={true}
                    wishlistId={wishlistId}
                  />
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
      {canUserEdit && (
        <AddProduct
          wishlistId={wishlistId}
          trigger={
            <Button
              icon={<PlusIcon size={25} />}
              size="circle"
              className="fixed bottom-4 left-1 z-10 "
            />
          }
        />
      )}
    </>
  );
};

export default ViewWishlist;
