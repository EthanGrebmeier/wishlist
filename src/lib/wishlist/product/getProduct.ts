import { eq } from "drizzle-orm";
import { db } from "~/server/db";

type getProductArgs = {
  productId: string;
};
export const getProduct = async ({ productId }: getProductArgs) => {
  const product = await db.query.products.findFirst({
    where: (product) => eq(product.id, productId),
  });

  if (!product) {
    throw new Error("Product could not be found");
  }

  return product;
};
