import type { Wishlist } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";
import Image from "next/image";
import { User } from "next-auth";

type ListItemProps = {
  wishlist: Wishlist;
  user: User;
};

const ListItem = ({ wishlist, user }: ListItemProps) => {
  const { name, id, products } = wishlist;

  const isEditor = wishlist.createdById === user.id;

  return (
    <li>
      <Link href={`/wishlist/${id}`}>
        <div className=" group w-full  space-y-4 rounded-md bg-slate-100 px-4 py-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-md object-cover">
            <Image alt="placeholder" src="https://placehold.co/600x600" fill />
            {isEditor && (
              <div className="absolute right-4 top-4">
                <WishlistMenu wishlist={wishlist} />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {" "}
            <div>
              <h2 className="text-2xl group-hover:underline"> {name} </h2>
              <div className="text-md"> {products.length} Items </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
