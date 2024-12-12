"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { Loader, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

import React from "react";
import { Button } from "~/components/ui/button";
import { deleteWishlist } from "~/server/actions/wishlist";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";

type DeleteWishListProps = {
  wishlistId: string;
};

const DeleteWishlist = ({ wishlistId }: DeleteWishListProps) => {
  const router = useRouter();
  const setIsWishlistSettingsOpen = useSetAtom(isWishlistSettingsOpenAtom);
  const queryClient = useQueryClient();
  const { execute, status } = useAction(deleteWishlist, {
    onSuccess: async () => {
      setIsWishlistSettingsOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      router.push("/wishlist");
    },
  });

  return (
    <div className="flex w-full justify-between rounded-md border border-black px-4 py-2">
      <div>
        <div className="flex items-center gap-2">
          <Trash2 size={20} />
          <h3 className="font-sans text-lg font-medium"> Delete Wishlist</h3>
        </div>
        <p className="text-sm font-medium leading-tight text-red-500">
          This action is irreversible
        </p>
      </div>
      <Button
        type="button"
        onClick={() =>
          execute({
            wishlistId,
          })
        }
        disabled={status === "executing"}
        icon={
          status === "executing" && (
            <Loader width={20} height={20} className="animate-spin" />
          )
        }
        className="mt-2"
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteWishlist;
