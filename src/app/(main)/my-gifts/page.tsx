import { Gift } from "lucide-react";
import React from "react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import TitleBar from "~/components/ui/title-bar";
import ProductList from "~/components/wishlist/wishlist/product-list";
import { getMyGifts } from "~/lib/wishlist/getWishlist";

const MyGiftsPage = async () => {
  const products = await getMyGifts();

  return (
    <div className=" relative h-full w-full">
      <TitleBar>
        <div className="flex items-center gap-2">
          <ColoredIconWrapper className="bg-pink-300">
            <Gift size={25} />
          </ColoredIconWrapper>
          <TitleBar.Title> My Gifts</TitleBar.Title>
        </div>
      </TitleBar>
      <section className="px-2 py-4 md:px-6">
        {products.length ? (
          <ProductList
            wishlistColor="white"
            isEditor={true}
            products={products
              .map((gift) => ({
                ...gift,
                commitments: [],
              }))
              .sort(
                (a, b) =>
                  (a.updatedAt?.getTime() ?? 0) - (b.updatedAt?.getTime() ?? 0),
              )}
          />
        ) : (
          <div className="mt-24 flex h-full w-full flex-col items-center justify-center gap-8">
            <div>
              <p className="mb-6 font-serif text-4xl font-medium">
                {" "}
                Your received gifts will appear here
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyGiftsPage;
