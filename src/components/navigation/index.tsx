import { getServerAuthSession } from "~/server/auth";
import NavLink from "./navlink";
import NavAccount from "./account";
import { BookUser, Scroll } from "lucide-react";

const Navigation = async () => {
  const isSignedIn = Boolean(await getServerAuthSession());

  // const wishlists = await getUserWishlists()

  return (
    <nav className="flex h-full w-[220px] flex-col justify-between">
      <div className="flex flex-col gap-2">
        {isSignedIn && (
          <>
            <NavLink href="/wishlist" Icon={Scroll}>
              My Wishlists{" "}
            </NavLink>
            <NavLink href="/wishlist/shared" Icon={BookUser}>
              Shared Wishlists
            </NavLink>
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
