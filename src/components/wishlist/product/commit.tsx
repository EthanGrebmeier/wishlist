"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";
import { commitToProduct, uncommitToProduct } from "~/server/actions/product";
import type {
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
} from "~/types/wishlist";

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
        <div className="flex flex-col gap-4">
          <div className="flex h-11 items-center justify-center rounded-md border border-primary-foreground bg-primary px-4 text-center text-sm font-medium text-primary-foreground">
            <p>
              {" "}
              <span className="font-extrabold"> You </span> are getting this
              item{" "}
            </p>
          </div>
          <form
            className="rounded-md border border-gray-200 bg-slate-100/40 px-4 py-6"
            action={() => executeUncommit({ productId: product.id })}
          >
            <p className="mb-4 text-center text-sm">
              {" "}
              No longer able to commit to this item?{" "}
            </p>
            <SubmitButton className="w-full" size="lg" variant="destructive">
              Cancel Commitment
            </SubmitButton>
          </form>
        </div>
      );
    }

    return (
      <ul className="flex h-11 items-center justify-center rounded-md border border-green-600 bg-green-200/60 px-4 text-center text-sm font-medium text-green-600">
        {productCommitments.map((commitment) => (
          <li key={commitment.id}>
            <span className="font-extrabold"> {commitment.user.name} </span> is
            getting this item!
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
      className="rounded-md border border-gray-200 bg-slate-100/40 px-4 py-6"
    >
      <p className="mb-4 text-center text-sm">
        {" "}
        Would you like to commit to this item?{" "}
      </p>
      <SubmitButton variant="default" size="lg" className="w-full">
        I will purchase this item
      </SubmitButton>
    </form>
  );
};

export default Commit;
