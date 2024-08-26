"use client";

import { ShoppingBasket, Trash2, X } from "lucide-react";
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
        <div className="grid grid-cols-[1fr_auto] gap-2 ">
          <div>
            <h2 className="font-serif text-2xl font-medium">
              Product Commitment
            </h2>
            <div className="flex flex-col justify-center  text-balance text-black">
              <p className="max-w-[340px] text-balance text-sm font-normal">
                {" "}
                <span className="font-serif text-lg"> You </span> are getting
                this item!{" "}
              </p>
            </div>
          </div>
          <form
            className="flex items-center"
            action={() => executeUncommit({ productId: product.id })}
          >
            <SubmitButton
              icon={<X size={25} />}
              className="h-fit w-fit"
              variant="destructive"
            >
              {" "}
            </SubmitButton>
          </form>
        </div>
      );
    }

    return (
      <div>
        <ul className="flex w-full items-center font-serif text-xl font-medium text-black">
          {productCommitments.map((commitment) => (
            <li
              key={commitment.id}
              className="flex w-full items-center gap-4 overflow-hidden"
            >
              <span className="w-fit flex-1 text-end font-sans font-normal leading-tight">
                {" "}
                <span className="flex items-center gap-2">
                  {" "}
                  {commitment.user.image && (
                    <SharedUserThumbnail className="relative size-10">
                      <Image
                        alt={commitment.user.name ?? ""}
                        fill
                        src={commitment.user.image}
                      />
                    </SharedUserThumbnail>
                  )}
                  <p className="flex-1 translate-y-[2px]">
                    {commitment.user.name} is getting this item!
                  </p>
                </span>
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
      className="grid grid-cols-[1fr_auto] gap-2 "
    >
      <div className="-mt-1">
        <h2 className="font-serif text-2xl font-medium">Commit to this item</h2>
        <p className=" text-balance text-sm leading-tight tracking-tight">
          Commit to let others know that you intend to purchase this item
        </p>
      </div>
      <div className=" flex items-center">
        <SubmitButton
          icon={<ShoppingBasket size={25} />}
          variant="default"
          className="h-fit w-fit"
        >
          {" "}
        </SubmitButton>
      </div>
    </form>
  );
};

export default Commit;
