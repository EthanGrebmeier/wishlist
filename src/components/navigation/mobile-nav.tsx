import {
  ArrowRight,
  BookUserIcon,
  ContactRound,
  GiftIcon,
  ScrollIcon,
} from "lucide-react";
import { getAllWishlists } from "~/lib/wishlist/getWishlist";
import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import { cn } from "~/lib/utils";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import { colors } from "~/consts/colors";
import Link from "next/link";
import SignInOutButton from "./sign-out";

const MobileNavigation = async () => {
  const wishlists = await getAllWishlists();
  const session = await getServerAuthSession();
  return (
    <div className="flex h-full w-full flex-col gap-4 ">
      <div className="flex h-full w-full flex-col ">
        <div className="flex items-center justify-between gap-2 border-b border-black  p-2">
          <div className="ml-1 flex items-center gap-2">
            <ScrollIcon size={20} />
            <p className=" text-lg font-semibold"> My Wishlists</p>
          </div>
          <NavLink className="w-fit text-sm" href="/wishlist">
            View All <ArrowRight size={12} />
          </NavLink>
        </div>
        <div className="flex flex-1 scroll-mt-1 flex-col gap-1 overflow-y-auto p-2">
          {wishlists
            .sort(
              (a, b) =>
                a.updatedAt?.getTime() ?? 0 - (b.updatedAt?.getTime() ?? 0),
            )
            .map((wishlist) => {
              const colorTheme = colors.find(
                (colorTheme) => colorTheme.name === wishlist.color,
              );
              return (
                <NavLink
                  className="flex h-auto w-full items-center justify-start gap-2 rounded-md border-0 px-2 py-0 text-lg font-normal data-[selected=active]:bg-green-200"
                  key={wishlist.id}
                  href={`/wishlist/${wishlist.id}`}
                >
                  {session?.user.id === wishlist.createdById ? (
                    <p
                      className={cn(
                        "aspect-square h-4 w-4 rounded-full border border-black",
                        colorTheme?.background ?? "bg-white",
                      )}
                    />
                  ) : (
                    <ColoredIconWrapper
                      className={cn(
                        "rounded-sm border bg-white",
                        colorTheme?.background ?? "bg-white",
                      )}
                    >
                      <ContactRound size={12} />
                    </ColoredIconWrapper>
                  )}

                  <p className="line-clamp-1 flex-1">{wishlist.name}</p>
                </NavLink>
              );
            })}
        </div>
        <div className="grid shrink-0 grid-cols-3 border-t-2 border-black ">
          <Link
            className="flex flex-col items-center border-r-2 border-black bg-blue-300 pb-1 pt-2 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  "
            href="/my-commitments"
          >
            <BookUserIcon size={24} />
            <p className="font-bold">Commitments</p>
          </Link>
          <Link
            className="flex flex-col items-center border-r-2 border-black bg-pink-300 pb-1 pt-2 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/my-gifts"
          >
            <GiftIcon size={24} />
            <p className="font-bold">Gifts</p>
          </Link>
          <SignInOutButton
            className="flex flex-col items-center bg-yellow-300 pb-1 pt-2 font-bold focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            isSignedIn={!!session}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
