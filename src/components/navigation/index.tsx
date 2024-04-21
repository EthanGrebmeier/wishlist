import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import NavAccount from "./account";
import { BookUser, Plus, Scroll } from "lucide-react";
import MyWishlists from "./wishlist-list/my-wishlists";
import SharedWishlists from "./wishlist-list/shared-wishlists";
import CreateWishlist from "../wishlist/create-wishlist";

const Navigation = async () => {
  const isSignedIn = Boolean(await getServerAuthSession());

  // const wishlists = await getUserWishlists()

  return (
    <nav className="flex h-full w-full flex-col justify-between gap-8 lg:w-[220px]">
      <div className="flex flex-col gap-2">
        {isSignedIn && (
          <>
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
            <NavLink href="/wishlist/shared" Icon={BookUser}>
              Shared Wishlists
            </NavLink>
            <SharedWishlists />
          </>
        )}
      </div>
      <div className="flex">
        <NavAccount isSignedIn={isSignedIn} />
      </div>
    </nav>
  );
};

export default Navigation;
