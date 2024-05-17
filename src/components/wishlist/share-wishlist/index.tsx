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
import type { ReactNode } from "react";

type ShareWishlistProps = {
  wishlistId: string;
  magicLink: ReactNode;
  userId: string;
  sharedUsers: User[];
  isEditor: boolean;
};

const ShareWishlist = ({
  wishlistId,
  magicLink,
  userId,
  sharedUsers,
  isEditor,
}: ShareWishlistProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <Tooltip text="Share Wishlist">
          <DialogTrigger asChild>
            <Button icon={<Share size={20} />}></Button>
          </DialogTrigger>
        </Tooltip>

        <DialogContent className="w-full max-w-[440px]">
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium"> Share </h1>
            {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
          </DialogHeader>
          <div className="flex flex-col gap-4 overflow-hidden  pt-2">
            <SharedUsers
              sharedUsers={sharedUsers}
              userId={userId}
              wishlistId={wishlistId}
              isEditor={isEditor}
            />
            {isEditor && magicLink}
            {isEditor && <ShareWishlistForm wishlistId={wishlistId} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button icon={<Share size={20} />}></Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px]">
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Share
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[80svh] overflow-y-scroll p-4 pb-28">
          {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
          <div className="space-y-4">
            <SharedUsers
              sharedUsers={sharedUsers}
              userId={userId}
              wishlistId={wishlistId}
              isEditor={isEditor}
            />
            {magicLink}
            <ShareWishlistForm wishlistId={wishlistId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareWishlist;
