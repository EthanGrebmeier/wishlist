import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import SignOutButton from "./sign-out";
import { BookUser, Gift, Plus, Scroll, ShieldQuestion } from "lucide-react";
import MyWishlists from "./wishlist-list/my-wishlists";
import SharedWishlists from "./wishlist-list/shared-wishlists";
import CreateWishlist from "../wishlist/create-wishlist";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const Navigation = async () => {
  const isSignedIn = Boolean(await getServerAuthSession());

  // const wishlists = await getUserWishlists()

  return (
    <nav className="flex h-full w-full flex-col justify-between gap-8 lg:w-[220px]">
      <div className="flex flex-col gap-2">
        {isSignedIn && (
          <>
            <div>
              <NavLink href="/wishlist" Icon={Scroll}>
                My Wishlists{" "}
              </NavLink>
              <MyWishlists />
              <div className="w-full pl-2">
                <CreateWishlist
                  trigger={
                    <button className="group flex w-full items-center gap-1 rounded-md px-1 text-lg font-medium transition-all hover:bg-green-300">
                      <Plus className="group-hover:animate-shake " size={20} />
                      Create Wishlist{" "}
                    </button>
                  }
                />
              </div>
            </div>
            <div>
              <NavLink href="/wishlist/shared" Icon={BookUser}>
                Shared Wishlists
              </NavLink>
              <SharedWishlists />
            </div>
            <div>
              <NavLink href="/my-gifts" Icon={Gift}>
                My Gifts
              </NavLink>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        <SignOutButton />
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
