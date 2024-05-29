"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { CreateWishlistForm } from "../../create-wishlist";
import type { Wishlist } from "~/types/wishlist";
import { useRouter } from "next/navigation";

type WishlistSettingsContentProps = {
  wishlist: Wishlist;
  onSuccess?: () => void;
  isOwner: boolean;
};

const WishlistSettingsContent = ({
  wishlist,
  onSuccess,
  isOwner,
}: WishlistSettingsContentProps) => {
  const router = useRouter();

  return (
    <DialogContent className=" overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-serif text-4xl font-medium">
          Wishlist Settings
        </DialogTitle>
      </DialogHeader>
      <CreateWishlistForm
        values={{
          imageUrl: wishlist.imageUrl,
          wishlistId: wishlist.id,
          date: wishlist.dueDate,
          color: wishlist.color,
          wishlistName: wishlist.name,
          isSecret: wishlist.isSecret,
        }}
        isOwner={isOwner}
        onSuccess={() => {
          router.refresh();
          onSuccess && onSuccess();
        }}
      />
    </DialogContent>
  );
};

export default WishlistSettingsContent;
