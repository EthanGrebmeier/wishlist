"use client";
import React, { useEffect } from "react";
import TitleBar from "~/components/ui/title-bar";
import { cn, getBackgroundColor } from "~/lib/utils";
import ShareWishlist from "../../share-wishlist";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import type { Session } from "next-auth";
import { SharedUserThumbnailView } from "../../share-wishlist/shared-users/shared-user-thumbnail";
import type { UserTypeWithOwner } from "~/types/user";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";
import DueDate from "../../due-date";
import { canUserEditAtom, viewedWishlistAtom } from "~/store/wishlist-settings";
import { useSetAtom } from "jotai";

type WishlistHeaderProps = {
  wishlist: Wishlist;
  userStatus: UserTypeWithOwner;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

const WishlistHeader = ({
  wishlist,
  wishlistShares,
  session,
  userStatus,
}: WishlistHeaderProps) => {
  const setCanUserEdit = useSetAtom(canUserEditAtom);
  const setViewedWishlist = useSetAtom(viewedWishlistAtom);

  useEffect(() => {
    setCanUserEdit(verifyUserIsWishlistEditor(userStatus));
  }, [userStatus, setCanUserEdit]);

  useEffect(() => {
    setViewedWishlist(wishlist);
  }, [wishlist, setViewedWishlist]);

  return (
    <TitleBar
      wrapperClassName="sticky top-[72px] md:top-0"
      className=" w-full flex-wrap items-center py-2 md:flex-col"
    >
      <div
        className={cn("flex w-full flex-1 items-center justify-between gap-4")}
      >
        <div className="flex flex-row items-center gap-2">
          <div
            className={cn(
              "hidden h-6 w-6 flex-shrink-0 rounded-full border-2 border-black md:flex",
              getBackgroundColor(wishlist.color),
            )}
          ></div>
          <TitleBar.Title>{wishlist.name}</TitleBar.Title>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="flex flex-col items-end gap-2  md:flex-row">
            {wishlist.dueDate && (
              <div
                className={cn(
                  "flex w-full items-center justify-between ",
                  wishlist.dueDate ? "justify-between" : "justify-end",
                )}
              >
                <DueDate wishlist={wishlist} />
              </div>
            )}
          </div>
          <SharedUserThumbnailView
            wishlistShares={wishlistShares.filter(
              (share) => share.type !== "invitee",
            )}
          />
        </div>
      </div>
      <ShareWishlist
        wishlistShares={wishlistShares}
        wishlist={wishlist}
        userStatus={userStatus}
        userId={session.user.id}
      />
    </TitleBar>
  );
};

export default WishlistHeader;
