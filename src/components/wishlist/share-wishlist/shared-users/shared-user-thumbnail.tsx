import React, { type ReactNode } from "react";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import type { User } from "~/types/user";

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
  sharedUsers,
}: {
  sharedUsers: User[];
}) => {
  // const const isDesktop = useMediaQuery("(min-width: 768px)");
  const numThumbnails = sharedUsers.length > 4 ? 3 : 4;

  return (
    <div className="flex">
      {sharedUsers.slice(0, numThumbnails).map((user) => (
        <Tooltip text={user.name ?? user.email} key={user.id}>
          <SharedUserThumbnail className="[&:not(:first-child)]:-ml-4 md:[&:not(:first-child)]:-ml-2">
            {user.image ? (
              <img src={user.image}></img>
            ) : (
              <p>{user.name?.charAt(0)}</p>
            )}
          </SharedUserThumbnail>
        </Tooltip>
      ))}
      {sharedUsers.length > numThumbnails && (
        <SharedUserThumbnail className="[&:not(:first-child)]:-ml-4 md:[&:not(:first-child)]:-ml-2">
          <div className="flex h-full w-full items-center justify-center bg-green-300">
            <p className=""> +{sharedUsers.length - numThumbnails} </p>
          </div>
        </SharedUserThumbnail>
      )}
    </div>
  );
};

export default SharedUserThumbnail;
