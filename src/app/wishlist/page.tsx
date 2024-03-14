import CreateWishlist from "~/components/wishlist/create-wishlist";
import ListView from "~/components/wishlist/list-view";

const WishlistPage = () => {
  return (
    <div className="max-h-full overflow-y-auto py-6">
      <div className="mb-4 flex items-center justify-between  px-6 pb-2">
        <h1 className="text-4xl font-medium"> My Wishlists</h1>
        <CreateWishlist />
      </div>
      <div className="px-4 py-6">
        <ListView />
      </div>
    </div>
  );
};

export default WishlistPage;
