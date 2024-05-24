import React, { Suspense } from "react";
import TitleBar from "~/components/ui/title-bar";
import { cn, getBackgroundColor } from "~/lib/utils";
import ShareWishlist from "../../share-wishlist";
import { AddProduct } from "../add-product";
import WishlistSettings from "../settings";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import type { Session } from "next-auth";
import { SharedUserThumbnailView } from "../../share-wishlist/shared-users/shared-user-thumbnail";
import DueDate from "../../due-date";
import MagicLink from "../../share-wishlist/magic-link/index";
import type { UserTypeWithOwner } from "~/types/user";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";

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
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);
  return (
    <TitleBar
      wrapperClassName="sticky top-[72px] md:top-0"
      className=" w-full flex-wrap items-start py-2 md:flex-col"
    >
      <div
        className={cn(
          "flex w-full flex-1 items-center justify-between gap-4",
          (canUserEdit || wishlist.dueDate) && "border-b-2 border-black pb-2",
        )}
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
        <div className="flex items-center gap-2">
          <SharedUserThumbnailView
            wishlistShares={wishlistShares.filter(
              (share) => share.type !== "invitee",
            )}
          />
          <div>
            <ShareWishlist
              wishlistShares={wishlistShares}
              magicLink={
                <Suspense
                  fallback={
                    <div className="h-[206px] w-[324px] pb-6">
                      <div className="flex flex-col">
                        <h3 className="font-sans text-lg font-medium">
                          Magic Link
                        </h3>
                        <p className="mb-2 text-balance font-sans text-sm tracking-tight">
                          Share this link with anyone to grant access to this
                          wishlist
                        </p>
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-24"></div>
                      </div>
                    </div>
                  }
                >
                  <MagicLink wishlistId={wishlist.id} />
                </Suspense>
              }
              wishlist={wishlist}
              userStatus={userStatus}
              userId={session.user.id}
            />
          </div>
        </div>
      </div>
      {(canUserEdit || wishlist.dueDate) && (
        <div
          className={cn(
            "flex w-full items-center justify-between pt-2",
            wishlist.dueDate ? "justify-between" : "justify-end",
          )}
        >
          <DueDate wishlist={wishlist} />
          {canUserEdit && (
            <div className="flex flex-nowrap space-x-1 xs:w-fit md:space-x-4 md:px-0 ">
              <div className="hidden md:block">
                <AddProduct wishlistId={wishlist.id} />{" "}
              </div>

              <WishlistSettings
                isOwner={userStatus === "owner"}
                wishlist={wishlist}
              />
            </div>
          )}
        </div>
      )}
    </TitleBar>
  );
};

export default WishlistHeader;
