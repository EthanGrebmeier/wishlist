"use client";

import { Loader, User as UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { unshareWishlist } from "~/app/(main)/wishlist/[wishlistId]/actions";
import { Tooltip } from "~/components/ui/tooltip";
import type { User } from "~/types/user";

type SharedUserItemProps = {
  userId: string;
  sharedUser: User;
  wishlistId: string;
  isEditor: boolean;
};

const SharedUserItem = ({
  userId,
  sharedUser,
  wishlistId,
  isEditor,
}: SharedUserItemProps) => {
  // TODO: Make this optimistic with useOptimistic
  const [state, action] = useFormState(unshareWishlist, null);

  const actionWithData = action.bind(null, {
    sharedWithUserId: sharedUser.id,
    wishlistId,
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.message === "success") {
      router.refresh();
    }
  }, [state, router]);
  // bg - [#E8EDDF];
  return (
    <div className="relative flex w-full items-center justify-between gap-4 font-medium text-black">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-10 overflow-hidden rounded-full border-2 border-black object-cover">
          {sharedUser.image && <img src={sharedUser.image}></img>}
        </div>
        <div>
          <p className="-mb-1">
            {userId !== sharedUser.id ? sharedUser.name : "You"}
          </p>
          <p className="text-xs ">{sharedUser.email}</p>
        </div>
      </div>
      {userId !== sharedUser.id && isEditor && (
        <Tooltip text="Remove Shared User">
          <div className="rounded-md border-2 border-black bg-red-400 p-1 ">
            <form className="flex items-center" action={actionWithData}>
              <DeleteShareButton />
            </form>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

const DeleteShareButton = () => {
  const formStatus = useFormStatus();

  return (
    <button className="text-sm">
      {formStatus.pending ? (
        <Loader size={15} className=" animate-spin" />
      ) : (
        <XIcon size={15} />
      )}
    </button>
  );
};

export default SharedUserItem;
