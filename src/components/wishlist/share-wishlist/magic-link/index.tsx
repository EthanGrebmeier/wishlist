import React from "react";
import { getMagicLink } from "~/server/actions/wishlist";
import ResetLink from "./reset-link";
import CopyButton from "./copy-button";
import { env } from "process";

type MagicLinkProps = {
  wishlistId: string;
};
const MagicLink = async ({ wishlistId }: MagicLinkProps) => {
  const magicLinkQuery = await getMagicLink({ wishlistId });

  const magicLink = magicLinkQuery.data?.magicLink;

  if (!magicLink) {
    return null;
  }

  const magicLinkBase = env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000";

  const magicLinkUrl = `https://${magicLinkBase}/wishlist/join/${magicLink.id}`;

  return (
    <div className="border-b-2 border-b-black pb-6">
      <div className="flex flex-col">
        <h3 className="font-sans text-lg font-medium">Magic Link</h3>
        <p className="mb-2 text-balance font-sans text-sm tracking-tight">
          Share this link with anyone to grant access to this wishlist
        </p>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-initial flex-row items-center">
            <div className="w-full min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex w-full min-w-0 flex-shrink items-center rounded-md border-2 border-black px-2">
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {magicLinkUrl}
                  </span>
                  <ResetLink wishlistId={wishlistId} />
                </div>
                <CopyButton textToCopy={magicLinkUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MagicLink;
