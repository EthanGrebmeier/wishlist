"use client";
import React from "react";
import ResetLink from "./reset-link";
import { getMagicLinkUrl } from "~/lib/wishlist/getMagicLinkUrl";

type MagicLinkProps = {
  wishlistId: string;
  magicLinkId?: string;
};
const MagicLink = ({ wishlistId, magicLinkId }: MagicLinkProps) => {
  const magicLinkUrl = magicLinkId ? getMagicLinkUrl(magicLinkId) : undefined;
  return (
    <div>
      <div className="flex flex-col">
        <h3 className="font-sans text-lg font-medium">Magic Link</h3>
        <p className="mb-2 text-balance font-sans text-sm tracking-tight">
          Share this link with anyone to grant access to this wishlist
        </p>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-initial flex-row items-center">
            <div className="w-full min-w-0">
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-full min-w-0 flex-shrink items-center overflow-hidden rounded-md border border-black p-2 pr-1">
                  <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                    {magicLinkUrl ? magicLinkUrl : "Loading..."}
                  </span>
                  <ResetLink wishlistId={wishlistId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MagicLink;
