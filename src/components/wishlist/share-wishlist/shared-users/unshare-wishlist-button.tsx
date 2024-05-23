"use client";

import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { cn } from "~/lib/utils";
import { unshareWishlist } from "~/server/actions/wishlist";
import type { User } from "~/types/user";

type UnshareWishlistButtonProps = {
  wishlistId: string;
  sharedUser: User;
  className?: string;
};

const UnshareWishlistButton = ({
  wishlistId,
  sharedUser,
  className,
}: UnshareWishlistButtonProps) => {
  const { execute, status } = useAction(unshareWishlist);
  const router = useRouter();

  useEffect(() => {
    if (status === "hasSucceeded") {
      router.refresh();
    }
  }, [router, status]);

  return (
    <button
      onClick={() =>
        execute({
          wishlistId,
          sharedWithUserId: sharedUser.id,
        })
      }
      className={cn("flex w-full items-center gap-2 text-red-400", className)}
    >
      <span> Remove User </span>{" "}
      {status === "executing" && <Loader size={15} className=" animate-spin" />}
    </button>
  );
};

export default UnshareWishlistButton;
