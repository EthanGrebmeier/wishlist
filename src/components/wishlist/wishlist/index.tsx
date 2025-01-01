import { getWishlist } from "~/lib/wishlist/getWishlist";
import ProductList from "./product-list";
import { getServerAuthSession } from "~/server/auth";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import WishlistHeader from "./header";
import { redirect } from "next/navigation";
import { getUserShareType } from "~/lib/wishlist/getUserShareType";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";
import { AddProductSheetTrigger } from "./add-product";
import { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";

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
  const shouldHidePurchased = wishlist.canEdit && wishlist.isSecret;

  const unpurchased: WishlistProductWithCommitmentsWithUser[] = [];
  const purchased: WishlistProductWithCommitmentsWithUser[] = [];
  wishlist.products.forEach((product) => {
    if (product.commitments?.length) {
      purchased.push(product);
    } else {
      unpurchased.push(product);
    }
  });

  return (
    <>
      <WishlistHeader
        wishlist={wishlist}
        userStatus={userStatus}
        wishlistShares={wishlistShares}
        session={session}
      />
      <section>
        {wishlist.products.length ? (
          <div className="flex flex-col gap-4">
            {unpurchased.length ? (
              <div className="flex flex-col gap-2">
                <p className="font-serif text-2xl font-medium">
                  {" "}
                  Unpurchased Products
                </p>

                <ProductList
                  wishlistColor={wishlist.color}
                  canUserEdit={canUserEdit}
                  products={unpurchased}
                />
              </div>
            ) : null}
            {purchased.length ? (
              <div className="flex flex-col gap-2">
                <p className="font-serif text-2xl font-medium">
                  {" "}
                  Purchased Products
                </p>
                <ProductList
                  wishlistColor={wishlist.color}
                  canUserEdit={canUserEdit}
                  products={purchased}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-24 flex h-full w-full flex-col items-center justify-center gap-8">
            {canUserEdit ? (
              <div className="flex w-fit flex-col items-center justify-center gap-4">
                <p className="text-balance text-center font-serif text-3xl font-medium md:text-4xl">
                  {" "}
                  Let&apos;s add your first product!
                </p>
                <AddProductSheetTrigger />
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
    </>
  );
};

export default ViewWishlist;
