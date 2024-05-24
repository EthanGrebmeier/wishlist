"use client";

import { Share, UsersRound } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import ShareWishlistForm from "./share-wishlist-form";
import SharedUsers from "./shared-users";
import { Tooltip } from "~/components/ui/tooltip";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import type { ReactNode } from "react";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import type { UserTypeWithOwner } from "~/types/user";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";

type ShareWishlistProps = {
  wishlist: Wishlist;
  magicLink: ReactNode;
  userId: string;
  wishlistShares: WishlistSharesWithUser[];
  userStatus: UserTypeWithOwner;
};

const ShareWishlist = ({
  wishlist,
  magicLink,
  userId,
  wishlistShares,
  userStatus,
}: ShareWishlistProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);

  if (isDesktop) {
    return (
      <Dialog>
        <Tooltip text="Share Wishlist">
          <DialogTrigger asChild>
            <Button icon={<UsersRound size={20} />}></Button>
          </DialogTrigger>
        </Tooltip>

        <DialogContent className="w-full max-w-[440px]">
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium"> Sharing </h1>
            {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
          </DialogHeader>
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex min-w-0 flex-col gap-4 overflow-hidden pt-2">
              <SharedUsers
                wishlistShares={wishlistShares}
                userId={userId}
                wishlist={wishlist}
                isOwner={userStatus === "owner"}
                canUserEdit={canUserEdit}
              />
              {canUserEdit && magicLink}
            </div>
            {canUserEdit && <ShareWishlistForm wishlistId={wishlist.id} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button icon={<UsersRound size={20} />}></Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px]">
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Sharing
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[80svh] overflow-y-auto p-4 pb-28">
          {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
          <div className="space-y-4">
            <SharedUsers
              canUserEdit={canUserEdit}
              wishlistShares={wishlistShares}
              userId={userId}
              wishlist={wishlist}
              isOwner={userStatus === "owner"}
            />
            {magicLink}
            <ShareWishlistForm wishlistId={wishlist.id} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareWishlist;
