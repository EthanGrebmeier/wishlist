import type { WishlistWithProducts } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";
import Image from "next/image";
import type { User } from "next-auth";
import { formatDate } from "date-fns";
import { cn } from "~/lib/utils";
import { colors } from "~/consts/colors";

type ListItemProps = {
  wishlist: WishlistWithProducts;
  user: User;
};

const ListItem = ({ wishlist, user }: ListItemProps) => {
  const { name, id, products, color } = wishlist;

  const isEditor = wishlist.createdById === user.id;

  return (
    <li className="relative">
      {isEditor && (
        <div className="absolute right-4 top-4 z-10">
          <WishlistMenu wishlist={wishlist} />
        </div>
      )}
      <Link href={`/wishlist/${id}`}>
        <div
          className={cn(
            "group w-full space-y-4 overflow-hidden rounded-md",
            colors.find((colorTheme) => colorTheme.name === color)
              ?.background ?? "bg-white",
          )}
        >
          <div className="relative aspect-square w-full overflow-hidden object-cover">
            <Image alt="placeholder" src="https://placehold.co/600x600" fill />
          </div>
          <div className="flex items-center justify-between px-4 pb-2">
            {" "}
            <div>
              <h2 className="font-serif text-2xl group-hover:underline">
                {" "}
                {name}{" "}
              </h2>
            </div>
            <div className="text-end">
              {wishlist.dueDate && (
                <p className="text-sm">{formatDate(wishlist.dueDate, "P")}</p>
              )}
              <p className="text-sm"> {isEditor ? "You" : user.name} </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
