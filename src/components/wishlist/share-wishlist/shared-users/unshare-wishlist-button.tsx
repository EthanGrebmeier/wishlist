"use client";

import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { unshareWishlist } from "~/server/actions/wishlist";
import type { User } from "~/types/user";

interface UnshareWishlistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  wishlistId: string;
  sharedUser: User;
  className?: string;
}

const UnshareWishlistButton = forwardRef<
  HTMLButtonElement,
  UnshareWishlistButtonProps
>(({ wishlistId, sharedUser, className, onClick, ...rest }, ref) => {
  const { execute, status } = useAction(unshareWishlist, {
    onSuccess: () => router.refresh(),
  });
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick(e);
        execute({
          wishlistId,
          sharedWithUserId: sharedUser.id,
        });
      }}
      className={cn(
        "flex w-full items-center gap-2 text-red-400 ",
        className,
        "hover:text-red-400",
      )}
      ref={ref}
      {...rest}
    >
      Remove User
      {status === "executing" && <Loader size={15} className=" animate-spin" />}
    </button>
  );
});

UnshareWishlistButton.displayName = "UnshareWishlistButton";

export default UnshareWishlistButton;
