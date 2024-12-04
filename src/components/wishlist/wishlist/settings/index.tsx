"use client";

import { Button } from "~/components/ui/button";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";
import { useSetAtom } from "jotai";
import { PlusIcon } from "lucide-react";

type CreateWishlistProps = {
  triggerClassName?: string;
};

export const CreateWishlist = ({ triggerClassName }: CreateWishlistProps) => {
  const setIsWishlistSettingsOpen = useSetAtom(isWishlistSettingsOpenAtom);

  return (
    <>
      <div className="hidden md:block">
        <Button
          className={triggerClassName}
          onClick={() => setIsWishlistSettingsOpen(true)}
          icon={<PlusIcon size={15} />}
        >
          Create Wishlist
        </Button>
      </div>
      <div className="sm:hidden">
        <Button
          className={triggerClassName}
          onClick={() => setIsWishlistSettingsOpen(true)}
          size="circle"
        >
          <PlusIcon size={20} />
        </Button>
      </div>
    </>
  );
};

export default CreateWishlist;
