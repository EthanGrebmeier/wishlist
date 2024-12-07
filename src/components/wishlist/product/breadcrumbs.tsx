import Link from "next/link";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { Wishlist } from "~/types/wishlist";

type BreadcrumbsProps = {
  wishlist: Wishlist;
};

export default function Breadcrumbs({ wishlist }: BreadcrumbsProps) {
  return (
    <div className="col-span-full flex items-center gap-1 text-base font-medium leading-none [&_p]:mt-[2px]">
      <Link className="hover:underline" href="/wishlist">
        <p>My Wishlists</p>
      </Link>
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
