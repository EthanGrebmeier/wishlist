"use client";

import { Share } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import ShareWishlistForm from "./share-wishlist-form";
import SharedUsers from "./shared-users";
import Privacy from "./privacy";
import type { WishlistPrivacy } from "~/types/wishlist";
import { Tooltip } from "~/components/ui/tooltip";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import type { User } from "~/types/user";

type ShareWishlistProps = {
  wishlistId: string;
  privacyType: WishlistPrivacy;
  userId: string;
  sharedUsers: User[];
  isEditor: boolean;
};

const ShareWishlist = ({
  wishlistId,
  privacyType,
  userId,
  sharedUsers,
  isEditor,
}: ShareWishlistProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <Tooltip text="Share Wishlist">
          <DialogTrigger>
            <Button icon={<Share size={20} />}></Button>
          </DialogTrigger>
        </Tooltip>

        <DialogContent className="max-w-[360px]">
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium"> Share </h1>
            {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
            <div className="space-y-4  pt-2">
              <SharedUsers
                sharedUsers={sharedUsers}
                userId={userId}
                wishlistId={wishlistId}
                isEditor={isEditor}
              />
              {isEditor && <ShareWishlistForm wishlistId={wishlistId} />}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button icon={<Share size={20} />}>
          <span className="hidden lg:block"> Share </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Share
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-28">
          <Privacy wishlistId={wishlistId} privacyType={privacyType} />
          <div className="space-y-4 border-t border-slate-200 pt-2">
            <SharedUsers
              sharedUsers={sharedUsers}
              userId={userId}
              wishlistId={wishlistId}
              isEditor={isEditor}
            />
            <ShareWishlistForm wishlistId={wishlistId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareWishlist;
