import { colors } from "~/consts/colors";
import { cn } from "~/lib/utils";
import type { Wishlist } from "~/types/wishlist";
import NavLink from "../navlink";

type WishlistListProps = {
  wishlists: Wishlist[];
};

const WishlistList = ({ wishlists }: WishlistListProps) => {
  return (
    <div className="flex flex-col gap-1 pl-2">
      {wishlists.map((wishlist) => (
        <NavLink
          className="flex h-auto  w-full items-center justify-start gap-2 rounded-md border-0 px-2 py-0 text-lg font-medium data-[selected=active]:bg-green-200"
          key={wishlist.id}
          href={`/wishlist/${wishlist.id}`}
          shallowSelected
        >
          <span
            className={cn(
              "aspect-square h-3 w-3 rounded-full border border-black",
              colors.find((colorTheme) => colorTheme.name === wishlist.color)
                ?.background ?? "bg-white",
            )}
          >
            {" "}
          </span>{" "}
          <p className="line-clamp-1">{wishlist.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default WishlistList;
