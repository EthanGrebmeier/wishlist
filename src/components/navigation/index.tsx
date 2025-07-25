import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import SignInOutButton from "./sign-out";
import {
  ArrowRight,
  BookUserIcon,
  Gift,
  Scroll,
  ShieldQuestion,
} from "lucide-react";
import MyWishlists from "./wishlist-list/my-wishlists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "~/components/ui/link";
import { SearchPopover } from "./search-popover";
import { AddWishlistButton } from "./add-wishlist-button";

const Navigation = async () => {
  const isSignedIn = Boolean(await getServerAuthSession());

  return (
    <nav className="flex h-full w-full flex-col justify-between gap-8 lg:w-[240px] ">
      <div className="flex flex-col gap-2 px-3 md:px-0">
        {isSignedIn && (
          <div className="flex flex-col gap-2">
            <SearchPopover />
            <div className="flex flex-1 flex-col lg:max-h-none">
              <div className="sticky top-0 flex w-full items-center justify-between gap-4 bg-background">
                <NavLink Icon={Scroll} className="-ml-3" href="/wishlist">
                  Wishlists
                </NavLink>
                <AddWishlistButton />
              </div>
              <MyWishlists />
            </div>
            <div className="-ml-3 flex flex-col">
              <NavLink href="/my-commitments" Icon={BookUserIcon}>
                My Commitments
              </NavLink>
              <NavLink href="/my-gifts" Icon={Gift}>
                My Gifts
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <SignInOutButton
          className="group flex h-8 w-fit items-center gap-2 rounded-md px-2 text-xl font-medium transition-colors  hover:bg-blue-200 data-[selected=active]:bg-green-200"
          isSignedIn={isSignedIn}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md p-1 transition-colors hover:bg-secondary">
            <ShieldQuestion size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/privacy">Privacy Policy</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/terms">Terms and Conditions</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/guidelines">Community Guidelines</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navigation;
