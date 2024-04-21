import ListItem from "./item";

import type { WishlistWithProducts } from "~/types/wishlist";
import type { Session } from "next-auth";
import { Frown } from "lucide-react";

type ListViewProps = {
  wishlists: WishlistWithProducts[];
  session: Session;
};

const ListView = async ({ wishlists, session }: ListViewProps) => {
  return (
    <ul className="grid gap-4 px-2 pt-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3 xl:grid-cols-4">
      {wishlists.length ? (
        wishlists.map((wishlist) => (
          <ListItem user={session.user} wishlist={wishlist} key={wishlist.id} />
        ))
      ) : (
        <div className="flex gap-4">
          <p className="font-serif text-3xl"> No wishlists found </p>
          <Frown size={30} />
        </div>
      )}
    </ul>
  );
};

export default ListView;
