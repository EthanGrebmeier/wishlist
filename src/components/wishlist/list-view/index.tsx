import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import ListItem from "./item";
import { getServerAuthSession } from "~/server/auth";

const ListView = async () => {
  const [wishlists, session] = await Promise.all([
    getUserWishlists(),
    getServerAuthSession(),
  ]);

  if (!session) {
    return;
  }

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {wishlists.map((wishlist) => (
        <ListItem user={session.user} wishlist={wishlist} key={wishlist.id} />
      ))}
    </ul>
  );
};

export default ListView;
