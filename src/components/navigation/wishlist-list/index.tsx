import { colors } from "~/consts/colors";
import { cn } from "~/lib/utils";
import type { Wishlist } from "~/types/wishlist";
import NavLink from "../navlink";
import { getServerAuthSession } from "~/server/auth";
import { ContactRound } from "lucide-react";

type WishlistListProps = {
  wishlists: Wishlist[];
};

const WishlistList = async ({ wishlists }: WishlistListProps) => {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col ">
      {wishlists
        .sort(
          (a, b) => a.updatedAt?.getTime() ?? 0 - (b.updatedAt?.getTime() ?? 0),
        )
        .map((wishlist) => (
          <NavLink
            className="flex h-auto w-full items-center justify-start gap-2 rounded-md border-0 px-2 py-0 text-lg font-normal data-[selected=active]:bg-green-200"
            key={wishlist.id}
            href={`/wishlist/${wishlist.id}`}
          >
            {session?.user.id !== wishlist.createdById && (
              <ContactRound size={12} />
            )}
            <span
              className={cn(
                "aspect-square h-3 w-3 rounded-full border border-black",
                colors.find((colorTheme) => colorTheme.name === wishlist.color)
                  ?.background ?? "bg-white",
              )}
            >
              {" "}
            </span>{" "}
            <p className="line-clamp-1 flex-1">{wishlist.name}</p>
          </NavLink>
        ))}
    </div>
  );
};

export default WishlistList;
