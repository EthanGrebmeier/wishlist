"use client";

import { Loader, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { unshareWishlist } from "~/app/wishlist/[wishlistId]/actions";
import type { User } from "~/types/user";

type SharedUserItemProps = {
  user: User;
  wishlistId: string;
};

const SharedUserItem = ({ user, wishlistId }: SharedUserItemProps) => {
  // TODO: Make this optimistic with useOptimistic
  const [state, action] = useFormState(unshareWishlist, null);

  const actionWithData = action.bind(null, {
    sharedWithUserId: user.id,
    wishlistId,
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.message === "success") {
      router.refresh();
    }
  }, [state, router]);

  return (
    <div
      key={user.id}
      className="flex w-fit items-center gap-2 rounded-md bg-slate-100 px-2 py-2 font-bold text-black"
    >
      <p> {user.email}</p>
      <form className="flex items-center" action={actionWithData}>
        <DeleteShareButton />
      </form>
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
