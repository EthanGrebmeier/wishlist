import React, { Suspense } from "react";
import MagicLink from ".";

type MagicLinkSectionProps = {
  wishlistId: string;
  magicLinkId?: string;
};

const MagicLinkSection = ({
  wishlistId,
  magicLinkId,
}: MagicLinkSectionProps) => {
  return (
    <Suspense
      fallback={
        <div className="h-[206px] w-[324px] pb-6">
          <div className="flex flex-col">
            <h3 className="font-sans text-lg font-medium">Magic Link</h3>
            <p className="mb-2 text-balance font-sans text-sm tracking-tight">
              Share this link with anyone to grant access to this wishlist
            </p>
          </div>
        </div>
      }
    >
      <MagicLink magicLinkId={magicLinkId} wishlistId={wishlistId} />
    </Suspense>
  );
};

export default MagicLinkSection;
