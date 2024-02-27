import { BookUser } from "lucide-react";
import TitleBar from "~/components/ui/title-bar";
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
    <div className="max-h-full overflow-y-auto py-8">
      <TitleBar>
        <span className="flex items-center gap-4">
          <TitleBar.Title> Shared Wishlists</TitleBar.Title>
          <BookUser className="-mt-1" size={20} />
        </span>
      </TitleBar>
      <div className="px-6 pt-4">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
