import ListItem from "~/components/wishlist/list-view/item";
import { getSharedWishlists } from "~/lib/wishlist/getWishlist";
import { getServerAuthSession } from "~/server/auth";

const WishlistPage = async () => {
  const [sharedLists, session] = await Promise.all([
    getSharedWishlists(),
    getServerAuthSession(),
  ]);

  if (!session) {
    return;
  }

  return (
    <div className="max-h-full overflow-y-auto py-6">
      <div className="mb-4 flex items-center justify-between px-6 pb-4">
        <h1 className="text-4xl font-medium"> Shared Wishlists</h1>
      </div>
      <div className="px-4 py-4">
        <ul className="grid grid-cols-4 gap-4">
          {sharedLists.map((wishlist) => (
            <ListItem
              user={session.user}
              key={wishlist.id}
              wishlist={wishlist}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishlistPage;
