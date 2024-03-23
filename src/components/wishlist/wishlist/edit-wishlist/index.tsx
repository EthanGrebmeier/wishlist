"use client";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import type { Wishlist } from "~/types/wishlist";
import EditWishlistContent from "./edit-wishlist-content";
import { Button } from "~/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";

type EditWishlistProps = {
  wishlist: Wishlist;
};

const EditWishlist = ({ wishlist }: EditWishlistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button icon={<Settings size={20} />}>Settings</Button>
      </DialogTrigger>
      <EditWishlistContent
        onSuccess={() => setIsOpen(false)}
        wishlist={wishlist}
      />
    </Dialog>
  );
};

export default EditWishlist;
