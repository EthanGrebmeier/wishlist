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
    <div className="mx-auto mt-4 flex w-full max-w-[600px] grid-cols-1 flex-col gap-4 px-6 lg:mx-6 lg:mt-8 lg:grid  lg:h-screen lg:w-auto lg:max-w-none lg:flex-1 lg:grid-rows-[auto_1fr] lg:gap-14 lg:px-0">
      <Link
        className="group flex w-full items-center space-x-4 hover:underline"
        href={getWishlistSlug(wishlist)}
      >
        <ArrowLeft
          className="translate-x-0 transition-all group-hover:-translate-x-2"
          width={20}
          height={20}
        />{" "}
        <p className="text-sm md:text-lg"> Back to {wishlist.name}</p>
      </Link>
      <section className="flex h-full w-full flex-col gap-4 overflow-hidden lg:grid lg:grid-cols-[1fr_min-content] lg:gap-2 xl:gap-24">
        <div className="w-full gap-4 pb-4 align-top lg:mx-0">
          <div className="flex w-full items-center justify-center overflow-hidden rounded-md border border-gray-200  bg-white md:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-[340px] w-auto object-cover object-center"
              alt={product.name}
              /* eslint-disable-next-line  */
              src={product.image || "https://placehold.co/600x600"}
            />
          </div>
        </div>
        <div className="mx-auto flex w-full justify-end pt-1 lg:mx-0 lg:mr-4 lg:h-full lg:max-w-none">
          <div className="flex w-full flex-col justify-between gap-6  py-4 lg:-mt-4 lg:w-[340px] lg:pl-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-medium md:text-4xl">
                {product.name}
              </h1>
              {product.brand && <p className="text-lg"> {product.brand} </p>}
              {product.price && <p className="text-3xl"> ${product.price} </p>}
            </div>

            <div className="flex flex-col gap-4">
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
                  className="w-full"
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
