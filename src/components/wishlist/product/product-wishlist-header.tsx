"use client";
import React, { useEffect, useState } from "react";
import TitleBar from "~/components/ui/title-bar";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { Wishlist, WishlistSharesWithUser } from "~/types/wishlist";
import type { Session } from "next-auth";

import type { UserTypeWithOwner } from "~/types/user";

import { useAtomValue } from "jotai";

import Link from "next/link";

import DueDate from "../due-date";

import { SharedUserThumbnailView } from "../share-wishlist/shared-users/shared-user-thumbnail";
import { viewedProductAtom } from "~/store/product-settings";
import Priority from "../wishlist/product-list/product/priority";

type WishlistHeaderProps = {
  wishlist: Wishlist;
  wishlistShares: WishlistSharesWithUser[];
};

const ProductWishlistHeader = ({
  wishlist,
  wishlistShares,
}: WishlistHeaderProps) => {
  const viewedProduct = useAtomValue(viewedProductAtom);

  return (
    <TitleBar
      wrapperClassName="sticky top-[72px] md:top-0"
      className=" w-full flex-col items-start gap-2 py-2"
    >
      <div
        className={cn("flex w-full flex-1 items-start justify-between gap-4")}
      >
        <div className="flex flex-row items-start gap-2">
          <div
            className={cn(
              "h-6 w-6 flex-shrink-0 rounded-full border-2 border-black ",
              getBackgroundColor(wishlist.color),
            )}
          ></div>
          <Link className="underline" href={`/wishlist/${wishlist.id}`}>
            <TitleBar.Title>{wishlist.name}</TitleBar.Title>
          </Link>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="flex flex-col items-end gap-2  md:flex-row">
            {wishlist.dueDate && (
              <div
                className={cn(
                  "flex w-full items-center justify-between ",
                  wishlist.dueDate ? "justify-between" : "justify-end",
                )}
              >
                <DueDate date={wishlist.dueDate} color={wishlist.color} />
              </div>
            )}
          </div>
          <SharedUserThumbnailView
            wishlistShares={wishlistShares.filter(
              (share) => share.type !== "invitee",
            )}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="-mt-1 flex flex-col pt-2 md:hidden">
          <p className="w-fit font-serif text-2xl ">{viewedProduct?.name}</p>
          <p className="font-serif text-lg">{viewedProduct?.brand}</p>
        </div>
        {viewedProduct?.priority !== "normal" && (
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Priority
              showText={true}
              priorityLevel={viewedProduct?.priority ?? "normal"}
            />
            {viewedProduct?.price && (
              <p className="pr-1.5 text-xl">${viewedProduct?.price}</p>
            )}
          </div>
        )}
      </div>
    </TitleBar>
  );
};

export default ProductWishlistHeader;
