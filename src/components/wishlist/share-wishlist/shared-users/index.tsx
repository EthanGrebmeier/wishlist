import SharedUserItem from "./shared-user-item";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";

type SharedUsersProps = {
  wishlist: Wishlist;
  userId: string;
  wishlistShares: WishlistSharesWithUser[];
  isOwner: boolean;
};

const SharedUsers = ({
  wishlist,
  userId,
  wishlistShares,
  isOwner,
}: SharedUsersProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium"> Currently Shared With </h2>
      <div className="grid max-h-[260px] w-full gap-2 overflow-y-auto border-b-2 border-b-black pb-6">
        {wishlistShares.length ? (
          wishlistShares
            .sort((a) => (a.id === userId ? 1 : -1))
            .map((wishlistShare) => (
              <SharedUserItem
                isOwner={isOwner}
                userId={userId}
                wishlist={wishlist}
                wishlistShare={wishlistShare}
                key={wishlistShare.sharedWithUserId}
              />
            ))
        ) : (
          <p className="py-2"> Nobody yet...</p>
        )}
      </div>
    </div>
  );
};

export default SharedUsers;
