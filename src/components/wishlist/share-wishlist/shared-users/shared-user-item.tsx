"use client";

import { Loader, User as UserIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { unshareWishlist } from "~/app/wishlist/[wishlistId]/actions";
import type { User } from "~/types/user";

type SharedUserItemProps = {
  userId: string;
  sharedUser: User;
  wishlistId: string;
};

const SharedUserItem = ({
  userId,
  sharedUser,
  wishlistId,
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

  return (
    <div className="flex w-fit items-center gap-2 rounded-md border border-blue-800 bg-blue-200/60 px-2 py-2 font-bold text-blue-800">
      <p className="text-xs"> {sharedUser.email}</p>
      {userId !== sharedUser.id ? (
        <form className="flex items-center" action={actionWithData}>
          <DeleteShareButton />
        </form>
      ) : (
        <UserIcon size={20} />
      )}
    </div>
  );
};

const DeleteShareButton = () => {
  const formStatus = useFormStatus();

  return (
    <button>
      {formStatus.pending ? (
        <Loader width={20} height={20} className=" animate-spin" />
      ) : (
        <XIcon width={20} height={20} />
      )}
    </button>
  );
};

export default SharedUserItem;
