import { cn } from "~/lib/utils";
import SharedUserItem from "./shared-user-item";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";

type SharedUsersProps = {
  wishlist: Wishlist;
  userId: string;
  wishlistShares: WishlistSharesWithUser[];
  isOwner: boolean;
  canUserEdit: boolean;
};

const SharedUsers = ({
  wishlist,
  userId,
  wishlistShares,
  isOwner,
  canUserEdit,
}: SharedUsersProps) => {
  const sortedShares = wishlistShares.sort((a, b) => {
    const AisOwner = Number(a.sharedWithUserId === wishlist.createdById);
    const BisOwner = Number(b.sharedWithUserId === wishlist.createdById);

    if (AisOwner || BisOwner) {
      return BisOwner - AisOwner;
    }

    const AisYou = Number(a.users.id === userId);
    const BisYou = Number(b.users.id === userId);

    return BisYou - AisYou;
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium"> Currently Shared With </h2>
      </div>
      <div
        className={cn(
          "grid max-h-[360px] w-full gap-2 overflow-y-auto  pb-2",
          canUserEdit && " pb-6",
        )}
      >
        {wishlistShares.length ? (
          sortedShares.map((wishlistShare) => (
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
