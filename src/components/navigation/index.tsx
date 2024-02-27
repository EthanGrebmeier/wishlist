import { getServerAuthSession } from "~/server/auth";
import { Button } from "../ui/button";

import { getUserWishlists } from "~/lib/wishlist/getWishlist";
import Link from "../ui/link";

const Navigation = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <nav>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
    );
  }

  // const wishlists = await getUserWishlists()

  return (
    <nav>
      <div>
        <Link href="/wishlist">My Wishlists</Link>
      </div>
    </nav>
  );
};

export default Navigation;
