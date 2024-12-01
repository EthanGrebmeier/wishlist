"use client";

import { Loader, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

import React from "react";
import { Button } from "~/components/ui/button";
import { deleteWishlist } from "~/server/actions/wishlist";

type DeleteWishListProps = {
  wishlistId: string;
};

const DeleteWishlist = ({ wishlistId }: DeleteWishListProps) => {
  const router = useRouter();

  const { execute, status } = useAction(deleteWishlist, {
    onSuccess: () => {
      router.push("/wishlist");
    },
  });

  return (
    <div className="flex w-full justify-between rounded-md border-2 border-black px-4 py-2">
      <div>
        <div className="flex items-center gap-2">
          <Trash2 size={20} />
          <h3 className="font-sans text-lg font-medium"> Delete Wishlist</h3>
        </div>
        <p className="text-sm font-medium leading-tight text-red-500">
          Warning, this action is irreversible
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
