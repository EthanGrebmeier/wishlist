import Image from "next/image";
import React, { type ReactNode } from "react";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import type { User } from "~/types/user";
import { WishlistSharesWithUser } from "~/types/wishlist";

export const SharedUserThumbnail = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-10 w-10 overflow-hidden rounded-full border-2 border-black object-cover",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SharedUserThumbnailView = ({
  wishlistShares,
}: {
  wishlistShares: WishlistSharesWithUser[];
}) => {
  // const const isDesktop = useMediaQuery("(min-width: 768px)");
  const numThumbnails = wishlistShares.length > 4 ? 3 : 4;

  return (
    <div className="hidden xs:flex">
      {wishlistShares.slice(0, numThumbnails).map(({ users: user }) => (
        <Tooltip text={user.name ?? user.email} key={user.id}>
          <SharedUserThumbnail className="relative [&:not(:first-child)]:-ml-4 md:[&:not(:first-child)]:-ml-2">
            {user.image ? (
              <Image alt={user?.name ?? ""} fill src={user.image}></Image>
            ) : (
              <p>{user.name?.charAt(0)}</p>
            )}
          </SharedUserThumbnail>
        </Tooltip>
      ))}
      {wishlistShares.length > numThumbnails && (
        <SharedUserThumbnail className="z-10 [&:not(:first-child)]:-ml-4 md:[&:not(:first-child)]:-ml-2">
          <div className="flex h-full w-full items-center justify-center bg-green-300">
            <p className=""> +{wishlistShares.length - numThumbnails} </p>
          </div>
        </SharedUserThumbnail>
      )}
    </div>
  );
};

export default SharedUserThumbnail;
