import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "~/server/db";

type getProductArgs = {
  productId: string;
};
export const getProduct = async ({ productId }: getProductArgs) => {
  noStore(); // Opt out of caching for this data fetch
  
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.id, productId),
  });

  return product;
};
