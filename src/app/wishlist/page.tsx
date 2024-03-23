import { Scroll } from "lucide-react";
import TitleBar from "~/components/ui/title-bar";
import CreateWishlist from "~/components/wishlist/create-wishlist";
import ListView from "~/components/wishlist/list-view";

const WishlistPage = () => {
  return (
    <div className="max-h-full overflow-y-auto py-4 lg:py-8">
      <TitleBar>
        <span className="flex items-center gap-4">
          <TitleBar.Title>My Wishlists </TitleBar.Title>{" "}
          <Scroll className="-mt-1" size="20" />
        </span>
        <CreateWishlist />
      </TitleBar>
      <div className="px-6 pt-4">
        <ListView />
      </div>
    </div>
  );
};

export default WishlistPage;
