"use client";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import type { Wishlist } from "~/types/wishlist";
import WishlistSettingsContent from "./edit-wishlist-content";
import { Button } from "~/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useRouter } from "next/navigation";
import { CreateWishlistForm } from "../../create-wishlist";

type EditWishlistProps = {
  wishlist: Wishlist;
  isOwner: boolean;
};

const WishlistSettings = ({ wishlist, isOwner }: EditWishlistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" icon={<Settings size={20} />}>
            {" "}
            <span className="hidden lg:block "> Settings </span>
          </Button>
        </DialogTrigger>
        <WishlistSettingsContent
          onSuccess={() => setIsOpen(false)}
          isOwner={isOwner}
          wishlist={wishlist}
        />
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" icon={<Settings size={20} />}>
          {" "}
          <span className="hidden lg:block "> Settings </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Wishlist Settings
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex max-h-[80svh] flex-col gap-4 overflow-y-auto px-4 pb-4">
          <CreateWishlistForm
            values={{
              wishlistId: wishlist.id,
              imageUrl: wishlist.imageUrl,
              date: wishlist.dueDate,
              color: wishlist.color,
              wishlistName: wishlist.name,
              isSecret: wishlist.isSecret,
            }}
            isOwner={isOwner}
            onSuccess={() => {
              router.refresh();
              setIsOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WishlistSettings;
