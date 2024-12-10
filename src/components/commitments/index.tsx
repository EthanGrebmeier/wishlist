import type { CommitmentWithProduct } from "~/types/commitments";
import Product from "../wishlist/wishlist/product-list/product";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { getBackgroundColor } from "~/lib/utils";
import DueDate from "../wishlist/due-date";

type CommitmentsProps = {
  commitments: Record<string, CommitmentWithProduct[]>;
};

export const Commitments = ({ commitments }: CommitmentsProps) => {
  return (
    <div className="flex flex-col gap-8">
      {Object.entries(commitments).map(([wishlistId, commitments]) => {
        const wishlist = commitments[0]?.wishlist;
        if (!wishlist) {
          return null;
        }
        return (
          <div className="flex flex-col gap-4" key={wishlistId}>
            <div className="flex justify-between gap-2 rounded-md border-2 border-black p-4">
              <div className="flex flex-col gap-2">
                <Link className="underline" href={`/wishlist/${wishlistId}`}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-4 w-4 rounded-full border border-black",
                        getBackgroundColor(wishlist.color ?? "white"),
                      )}
                    />
                    <h2 className="font-serif text-2xl">{wishlist.name}</h2>
                  </div>
                </Link>
                <span className="text-sm ">
                  {commitments.length} Commitment
                  {commitments.length > 1 ? "s" : ""}
                </span>
              </div>
              {wishlist.dueDate && (
                <DueDate date={wishlist.dueDate} color={wishlist.color} />
              )}
            </div>
            <ul className="grid gap-4 xs:grid-cols-2 md:grid-cols-4">
              {commitments.map((commitment) => (
                <Product
                  key={commitment.id}
                  wishlistColor={commitment.wishlist.color}
                  product={commitment.product}
                  canUserEdit={false}
                  hideStatus={true}
                  animationDelay={0}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
