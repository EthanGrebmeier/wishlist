"use client";

import { Check, ChevronDown, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  leaveWishlistAction,
  setSharedUserType,
} from "~/server/actions/wishlist";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import UnshareWishlistButton from "./unshare-wishlist-button";
import StatusButton from "~/components/ui/status-button";

type SharedUserMenuProps = {
  userId: string;
  wishlistShare: WishlistSharesWithUser;
  wishlist: Wishlist;
  isOwner: boolean;
  isYou: boolean;
};

const SharedUserMenu = ({
  wishlistShare,
  wishlist,
  isOwner,
  userId,
  isYou,
}: SharedUserMenuProps) => {
  const router = useRouter();
  const { execute, status } = useAction(setSharedUserType, {
    onSuccess: () => router.refresh(),
  });
  const { execute: leaveWishlist, status: leaveWishlistStatus } = useAction(
    leaveWishlistAction,
    {
      onSuccess: () => router.push(`/wishlist`),
    },
  );

  const roles = [
    {
      roleTitle: "viewer",
      onSelect: () =>
        execute({
          wishlistId: wishlist.id,
          sharedUserId: wishlistShare.users.id,
          shareType: "viewer",
        }),
    },
    {
      roleTitle: "editor",
      onSelect: () =>
        execute({
          wishlistId: wishlist.id,
          sharedUserId: wishlistShare.users.id,
          shareType: "editor",
        }),
    },
  ];

  if (isYou && !isOwner) {
    return (
      <StatusButton
        status={leaveWishlistStatus}
        loadingContent={{ text: "Leaving" }}
        content={{ text: "Leave" }}
        hasSucceededContent={{ text: "Left" }}
        variant="destructive"
        onClick={() => leaveWishlist({ wishlistId: wishlist.id })}
      />
    );
  }

  if (wishlistShare.type === "invitee") {
    return <p className="pr-1 capitalize">Invited</p>;
  }

  if (wishlistShare.users.id === wishlist.createdById) {
    return <p className="pr-1"> Owner </p>;
  }

  if (!isOwner) {
    return <p className="pr-1 capitalize">{wishlistShare.type}</p>;
  }

  if (userId === wishlistShare.users.id) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-2 rounded-md font-medium capitalize transition-all">
          {wishlistShare.type}
          <ChevronDown size={15} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative">
        {roles.map((role) => (
          <DropdownMenuItem key={role.roleTitle} asChild>
            <button
              onClick={(e) => {
                e.preventDefault();
                role.onSelect();
              }}
              className="flex w-full items-center justify-between capitalize"
            >
              {role.roleTitle}{" "}
              {role.roleTitle === wishlistShare.type && <Check size={15} />}{" "}
            </button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <UnshareWishlistButton
            // className="text-sm"
            wishlistId={wishlist.id}
            sharedUser={wishlistShare.users}
          />
        </DropdownMenuItem>
        {status === "executing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20">
            <Loader width={20} height={20} className="animate-spin" />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SharedUserMenu;
