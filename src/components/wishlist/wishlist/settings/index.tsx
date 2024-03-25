"use client";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import type { Wishlist } from "~/types/wishlist";
import WishlistSettingsContent from "./edit-wishlist-content";
import { Button } from "~/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";

type EditWishlistProps = {
  wishlist: Wishlist;
};

const WishlistSettings = ({ wishlist }: EditWishlistProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
};

export default WishlistSettings;
