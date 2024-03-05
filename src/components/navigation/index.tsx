import { getServerAuthSession } from "~/server/auth";
import { Button } from "../ui/button";

import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import Link from "../ui/link";

const Navigation = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <nav>
        <div className="flex  gap-2">
          <Link variant="button" href="/api/auth/signin">
            Log In
          </Link>
          <Link variant="button" href="/signup">
            Sign Up
          </Link>
        </div>
      </nav>
    );
  }

  // const wishlists = await getUserWishlists()

  return (
    <nav>
      <div className="flex flex-col gap-2">
        <Link href="/wishlist">My Wishlists</Link>
        <Link href="/wishlist/shared">Shared Wishlists</Link>
      </div>
    </nav>
  );
};

export default Navigation;
