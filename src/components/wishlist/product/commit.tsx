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
import Image from "next/image";

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
        <div className="flex flex-col">
          <h2 className="font-serif text-2xl font-medium">
            Product Commitment
          </h2>
          <div className="flex flex-col justify-center  text-balance text-black">
            <p className="mb-2 max-w-[340px] text-balance font-sans font-normal">
              {" "}
              <span className="font-serif text-lg"> You </span> are getting this
              item!{" "}
            </p>
            <form action={() => executeUncommit({ productId: product.id })}>
              <SubmitButton className="w-fit" size="lg" variant="destructive">
                Cancel Commitment
              </SubmitButton>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="mb-2 font-serif text-2xl font-medium">
          Product Commitment
        </h2>
        <ul className="flex w-full items-center text-balance font-serif  text-2xl font-medium text-black">
          {productCommitments.map((commitment) => (
            <li
              key={commitment.id}
              className="flex items-center gap-4 overflow-hidden"
            >
              <span className="w-fit flex-1 font-sans font-normal leading-tight">
                {" "}
                <span className="flex items-center gap-2">
                  {" "}
                  {commitment.user.image && (
                    <SharedUserThumbnail className="relative h-7 w-7">
                      <Image
                        alt={commitment.user.name ?? ""}
                        fill
                        src={commitment.user.image}
                      />
                    </SharedUserThumbnail>
                  )}
                  <span className="translate-y-[2px] font-serif">
                    {" "}
                    {commitment.user.name}{" "}
                  </span>
                </span>{" "}
                is getting this item!
              </span>
            </li>
          ))}
        </ul>
      </div>
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
      <h2 className="font-serif text-2xl font-medium">Product Commitment</h2>
      <p className="mb-4 text-balance leading-tight tracking-tight">
        Committing will let others know that you intend to purchase this item
      </p>
      <SubmitButton variant="default" size="lg" className="w-fit">
        I will purchase this item
      </SubmitButton>
    </form>
  );
};

export default Commit;
