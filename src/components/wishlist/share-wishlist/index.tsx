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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
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
};

const ShareWishlist = ({
  wishlistId,
  privacyType,
  userId,
  sharedUsers,
}: ShareWishlistProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button icon={<Share size={20} />}>
                  {" "}
                  <span className="hidden lg:block"> Share </span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Share Wishlist</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent>
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium"> Share </h1>
            {/* <Privacy wishlistId={wishlistId} privacyType={privacyType} /> */}
            <div className="space-y-4  pt-2">
              <SharedUsers
                sharedUsers={sharedUsers}
                userId={userId}
                wishlistId={wishlistId}
              />
              <ShareWishlistForm wishlistId={wishlistId} />
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
            />
            <ShareWishlistForm wishlistId={wishlistId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareWishlist;
