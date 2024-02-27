"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { CreateWishlistForm } from "../../create-wishlist";
import type { Wishlist } from "~/types/wishlist";
import { useRouter } from "next/navigation";

type EditWishlistContentProps = {
  wishlist: Wishlist;
  onSuccess?: () => void;
};

const EditWishlistContent = ({
  wishlist,
  onSuccess,
}: EditWishlistContentProps) => {
  const router = useRouter();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-serif text-4xl font-medium">
          Wishlist Settings
        </DialogTitle>
      </DialogHeader>
      <CreateWishlistForm
        values={{
          wishlistId: wishlist.id,
          date: wishlist.dueDate,
          color: wishlist.color,
          wishlistName: wishlist.name,
        }}
        onSuccess={() => {
          router.refresh();
          onSuccess && onSuccess();
        }}
      />
    </DialogContent>
  );
};

export default EditWishlistContent;
