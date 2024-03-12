import { getServerAuthSession } from "~/server/auth";
import { Button } from "../ui/button";

import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import Link from "../ui/link";
import NavLink from "./navlink";

const Navigation = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <nav className="flex h-full flex-col justify-end">
        <div className="flex flex-col gap-2">
          <NavLink href="/api/auth/signin">Log In</NavLink>
          <NavLink href="/signup">Sign Up</NavLink>
        </div>
      </nav>
    );
  }

  // const wishlists = await getUserWishlists()

  return (
    <nav className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-2">
        <NavLink href="/wishlist">My Wishlists</NavLink>
        <NavLink href="/wishlist/shared">Shared Wishlists</NavLink>
      </div>
      <div className="flex">
        <NavLink href="/api/auth/signout">Log Out</NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
