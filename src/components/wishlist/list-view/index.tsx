import ListItem from "./item";

import type { WishlistWithProducts } from "~/types/wishlist";
import type { Session } from "next-auth";

type ListViewProps = {
  wishlists: WishlistWithProducts[];
  session: Session;
};

const ListView = async ({ wishlists, session }: ListViewProps) => {
  return (
    <ul className="grid gap-4 px-6 pt-4 sm:grid-cols-2 md:grid-cols-4">
      {wishlists.map((wishlist) => (
        <ListItem user={session.user} wishlist={wishlist} key={wishlist.id} />
      ))}
    </ul>
  );
};

export default ListView;
