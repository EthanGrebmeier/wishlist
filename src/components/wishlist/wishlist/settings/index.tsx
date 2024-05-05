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
};

const WishlistSettings = ({ wishlist }: EditWishlistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button icon={<Settings size={20} />}>
            {" "}
            <span className="hidden lg:block "> Settings </span>
          </Button>
        </DialogTrigger>
        <WishlistSettingsContent
          onSuccess={() => setIsOpen(false)}
          wishlist={wishlist}
        />
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button icon={<Settings size={20} />}>
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
        <div className="px-4 pb-4">
          <CreateWishlistForm
            values={{
              wishlistId: wishlist.id,
              imageUrl: wishlist.imageUrl,
              date: wishlist.dueDate,
              color: wishlist.color,
              wishlistName: wishlist.name,
              isSecret: wishlist.isSecret,
            }}
            onSuccess={() => {
              router.refresh();
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WishlistSettings;
