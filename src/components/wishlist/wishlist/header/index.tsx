import React from "react";
import TitleBar from "~/components/ui/title-bar";
import { Tooltip } from "~/components/ui/tooltip";
import { cn, getBackgroundColor } from "~/lib/utils";
import ShareWishlist from "../../share-wishlist";
import { AddProduct } from "../add-product";
import WishlistSettings from "../settings";
import type { Wishlist } from "~/types/wishlist";
import type { User } from "~/types/user";
import type { Session } from "next-auth";
import SharedUserThumbnail, {
  SharedUserThumbnailView,
} from "../../share-wishlist/shared-users/shared-user-thumbnail";
import DueDate from "../../due-date";

type WishlistHeaderProps = {
  wishlist: Wishlist;
  isEditor: boolean;
  sharedUsers: User[];
  session: Session;
};

const WishlistHeader = ({
  wishlist,
  isEditor,
  sharedUsers,
  session,
}: WishlistHeaderProps) => {
  return (
    <TitleBar
      wrapperClassName="sticky top-[72px] md:top-0"
      className=" w-full flex-wrap items-start py-2 md:flex-col"
    >
      <div
        className={cn(
          "flex w-full flex-1 items-center justify-between gap-4",
          (isEditor || wishlist.dueDate) && "border-b-2 border-black pb-4",
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
          <SharedUserThumbnailView sharedUsers={sharedUsers} />
          {isEditor && (
            <div>
              <ShareWishlist
                sharedUsers={sharedUsers}
                wishlistId={wishlist.id}
                isEditor={isEditor}
                userId={session.user.id}
                privacyType={wishlist.privacyType}
              />
            </div>
          )}
        </div>
      </div>
      {(isEditor || wishlist.dueDate) && (
        <div className="flex w-full items-center justify-between pt-2">
          <DueDate wishlist={wishlist} />
          {isEditor && (
            <div className="flex flex-nowrap space-x-1 overflow-x-auto xs:w-fit md:space-x-4 md:px-0 ">
              <div className="hidden md:block">
                <AddProduct wishlistId={wishlist.id} />{" "}
              </div>

              <WishlistSettings wishlist={wishlist} />
            </div>
          )}
        </div>
      )}
    </TitleBar>
  );
};

export default WishlistHeader;
