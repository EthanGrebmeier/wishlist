import { PlusIcon, Scroll } from "lucide-react";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import TitleBar from "~/components/ui/title-bar";
import CreateWishlist from "~/components/wishlist/create-wishlist";
import WishlistGrid from "~/components/wishlist/list-view/wishlist-grid";
import { getUserWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  return (
    <>
      <div className="h-full max-h-full md:overflow-y-auto md:pt-4 lg:pt-8">
        <TitleBar>
          <span className="flex items-center justify-center gap-4 pl-2">
            <Scroll size="25" />
            <TitleBar.Title>My Wishlists</TitleBar.Title>{" "}
          </span>

          <div className="hidden md:block">
            <CreateWishlist />
          </div>
        </TitleBar>
        <Suspense>
          <WishlistGrid getWishlists={getUserWishlists} />
        </Suspense>
      </div>
      <CreateWishlist
        trigger={
          <Button
            className="fixed bottom-4 left-1 z-10 flex h-11 w-11 rounded-full border-2 border-black bg-green-200 p-2 md:hidden"
            icon={<PlusIcon size={20} />}
          >
            {/* <span> Create Wishlist </span> */}
          </Button>
        }
      />
    </>
  );
};

export default WishlistPage;
