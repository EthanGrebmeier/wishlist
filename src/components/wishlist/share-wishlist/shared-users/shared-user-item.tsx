"use client";

import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import SharedUserMenu from "./shared-user-menu";
import Image from "next/image";

type SharedUserItemProps = {
  userId: string;
  wishlistShare: WishlistSharesWithUser;
  wishlist: Wishlist;
  isOwner: boolean;
};

const SharedUserItem = ({
  userId,
  wishlistShare,
  wishlist,
  isOwner,
}: SharedUserItemProps) => {
  const sharedUser = wishlistShare.users;
  // bg - [#E8EDDF];
  return (
    <div className="relative flex w-full items-center justify-between gap-4 pr-1 font-medium text-black">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-10 overflow-hidden rounded-full border-2 border-black object-cover">
          {sharedUser.image && (
            <Image
              alt={sharedUser.name ?? ""}
              fill
              src={sharedUser.image}
            ></Image>
          )}
        </div>
        <div>
          <p className="-mb-1">
            {userId !== sharedUser.id ? sharedUser.name : "You"}
          </p>
          <p className="text-xs ">{sharedUser.email}</p>
        </div>
      </div>

      <SharedUserMenu
        userId={userId}
        wishlistShare={wishlistShare}
        wishlist={wishlist}
        isOwner={isOwner}
      />
    </div>
  );
};

export default SharedUserItem;
