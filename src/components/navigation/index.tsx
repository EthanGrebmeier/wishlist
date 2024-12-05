import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import SignInOutButton from "./sign-out";
import { ArrowRight, Gift, Scroll, ShieldQuestion } from "lucide-react";
import MyWishlists from "./wishlist-list/my-wishlists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "~/components/ui/link";

const Navigation = async () => {
  const isSignedIn = Boolean(await getServerAuthSession());

  return (
    <nav className="flex h-full w-full flex-col justify-between gap-8 lg:w-[220px] ">
      <div className="flex flex-col gap-2 px-3 md:px-0">
        {isSignedIn && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <Scroll size={20} />
                  <p className="text-lg font-semibold">My Wishlists</p>
                </div>
                <NavLink className="w-fit text-sm" href="/wishlist">
                  View All <ArrowRight size={12} />
                </NavLink>
              </div>
              <MyWishlists />
            </div>
            <div className="-ml-3">
              <NavLink href="/my-gifts" Icon={Gift}>
                My Gifts
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <SignInOutButton isSignedIn={isSignedIn} />
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
