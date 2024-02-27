import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import ListItem from "./item";

const ListView = async () => {
  const wishlists = await getUserWishlists();
  return (
    <div className="grid w-[400px] gap-4">
      {wishlists.map((wishlist) => (
        <ListItem wishlist={wishlist} key={wishlist.id} />
      ))}
    </div>
  );
};

export default ListView;
