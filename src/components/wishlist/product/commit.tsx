"use client";

import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";
import { commitToProduct, uncommitToProduct } from "~/server/actions/product";
import type {
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
} from "~/types/wishlist";
import SharedUserThumbnail from "../share-wishlist/shared-users/shared-user-thumbnail";

type CommitProps = {
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  hasUserCommitted: boolean;
};

const Commit = ({
  product,
  productCommitments,
  hasUserCommitted,
}: CommitProps) => {
  const { execute: executeCommit } = useAction(commitToProduct, {
    onSuccess: () => {
      router.refresh();
    },
  });

  const { execute: executeUncommit } = useAction(uncommitToProduct, {
    onSuccess: () => {
      router.refresh();
    },
  });

  const router = useRouter();

  if (productCommitments?.length) {
    if (hasUserCommitted) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex   flex-col justify-center  text-balance font-medium text-black">
            <p className="max-w-[340px] text-balance border-b-2 border-black pb-2 font-serif text-2xl">
              {" "}
              <span className="italic"> You </span> are getting this item!{" "}
            </p>
            <form action={() => executeUncommit({ productId: product.id })}>
              <p className="mb-2 text-balance pt-2 font-serif text-lg">
                {" "}
                No longer able to commit?{" "}
              </p>
              <SubmitButton
                icon={<Trash2 size={20} />}
                className="w-fit"
                size="lg"
                variant="destructive"
              >
                Cancel Commitment
              </SubmitButton>
            </form>
          </div>
        </div>
      );
    }

    return (
      <ul className="flex items-center text-balance font-serif text-2xl  font-medium text-black">
        {productCommitments.map((commitment) => (
          <li key={commitment.id} className="flex items-center">
            {commitment.user.image && (
              <SharedUserThumbnail>
                <img src={commitment.user.image} />
              </SharedUserThumbnail>
            )}
            <p>
              {" "}
              <span className="italic"> {commitment.user.name} </span> is
              getting this item!
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <form
      action={() =>
        executeCommit({
          productId: product.id,
        })
      }
      // className="rounded-md border-2 border-black bg-green-100 px-4 py-6 "
    >
      <p className="mb-4 text-balance font-serif text-2xl font-medium leading-tight">
        Would you like to commit to this item?
      </p>
      <SubmitButton variant="default" size="lg" className="w-fit">
        I will purchase this item
      </SubmitButton>
    </form>
  );
};

export default Commit;
