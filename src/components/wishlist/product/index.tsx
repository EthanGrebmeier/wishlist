import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "~/components/ui/link";
import { getWishlistSlug } from "~/lib/wishlist/getWishlistSlug";
import type { Wishlist, WishlistProduct } from "~/types/wishlist";
import Commit from "./commit";
import { getProductCommitments } from "~/server/actions/product";
import ButtonLink from "~/components/ui/button-link";
import { getServerAuthSession } from "~/server/auth";

type ProductProps = {
  product: WishlistProduct;
  wishlist: Wishlist;
};

const Product = async ({ product, wishlist }: ProductProps) => {
  const [productCommitments, session] = await Promise.all([
    getProductCommitments({
      productId: product.id,
    }),
    getServerAuthSession(),
  ]);

  if (!session) {
    return null;
  }

  const hasUserCommitted = Boolean(
    productCommitments.data?.data.find(
      (commitment) => commitment.createdById === session.user.id,
    ),
  );

  return (
    <div className="mx-6 mt-8 flex h-screen flex-1 flex-col gap-14">
      <Link
        className="flex w-fit items-center space-x-4 hover:underline"
        href={getWishlistSlug(wishlist)}
      >
        <ArrowLeft width={20} height={20} /> <p> Back to {wishlist.name}</p>
      </Link>
      <section className="grid w-full flex-1 grid-cols-[640px_1fr] grid-rows-[1fr] gap-24">
        <div className="flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full rounded-md"
            alt={product.name}
            /* eslint-disable-next-line  */
            src={product.image || "https://placehold.co/600x600"}
          />
        </div>
        <div className="mr-12 flex h-full justify-end ">
          <div className="-mt-4 flex w-[340px] flex-col justify-between border-l border-gray-200 py-4 pl-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-medium"> {product.name} </h1>
              {product.brand && <p className="text-lg"> {product.brand} </p>}
              {product.price && <p className="text-3xl"> ${product.price} </p>}
            </div>

            <div className="flex flex-col gap-4 ">
              <Commit
                hasUserCommitted={hasUserCommitted}
                productCommitments={productCommitments.data?.data}
                product={product}
              />
              {product.url && (
                <ButtonLink
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  href={product.url}
                  icon={<ExternalLink size={20} />}
                >
                  View Product
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
