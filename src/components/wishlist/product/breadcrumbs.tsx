import { Session } from "next-auth";
import Link from "next/link";
import { cn, getBackgroundColor } from "~/lib/utils";
import { Wishlist } from "~/types/wishlist";

type BreadcrumbsProps = {
  wishlist: Wishlist;
  session: Session;
};

export default function Breadcrumbs({ wishlist, session }: BreadcrumbsProps) {
  const isWishlistOwner = wishlist.createdById === session?.user.id;
  return (
    <div className="col-span-full flex items-center gap-1 text-base font-medium leading-none [&_p]:mt-[2px]">
      {isWishlistOwner ? (
        <Link className="hover:underline" href="/wishlist">
          <p>My Wishlists</p>
        </Link>
      ) : (
        <Link href="/wishlist/shared" className="hover:underline">
          Shared Wishlists
        </Link>
      )}
      <p className="text-gray-400" aria-hidden="true">
        /
      </p>
      <Link
        href={`/wishlist/${wishlist.id}`}
        className="flex items-center justify-center gap-1"
      >
        <p className="hover:underline">{wishlist.name}</p>{" "}
        <div
          className={cn(
            "size-4 rounded-full border border-black",
            getBackgroundColor(wishlist.color),
          )}
        ></div>
      </Link>
    </div>
  );
}
