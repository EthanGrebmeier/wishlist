import ListView from "~/components/wishlist/list-view";
import ListItem from "~/components/wishlist/list-view/item";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";

const WishlistPage = async () => {
  const sharedLists = await getSharedWishlists();

  return (
    <div className="max-h-full overflow-y-auto py-6">
      <div className="mb-4 flex items-center justify-between border-b-2 border-black px-6 pb-4">
        <h1 className="text-4xl font-medium"> Shared Wishlists</h1>
      </div>
      <div className="px-4 py-6">
        <div className="grid w-[400px] gap-2">
          {sharedLists.map((wishlist) => (
            <ListItem key={wishlist.id} wishlist={wishlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
