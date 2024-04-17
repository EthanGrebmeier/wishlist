"use server";

import { load } from "cheerio";
import { z } from "zod";
import {
  makeProtectedAction,
  makeSafeAction,
} from "~/lib/actions/protectedAction";
import {
  type partialCompiledProductDataSchema,
  scrapeInputSchema,
  scrapeLDJSONSchema,
} from "~/schema/wishlist/scrape";

import { productSchema } from "~/schema/wishlist/product";
import { db } from "../db";
import {
  productCommitments,
  products,
  wishlistShares,
} from "../db/schema/wishlist";
import { and, eq, or } from "drizzle-orm";
import { getProduct } from "~/lib/wishlist/product/getProduct";
import { randomUUID } from "crypto";

type scrapeProductDataArgs = {
  url: string;
};

export const scrapeProductData = makeSafeAction(
  scrapeInputSchema,
  async ({ url }: scrapeProductDataArgs) => {
    const scrapedProductData: z.infer<typeof partialCompiledProductDataSchema> =
      {
        name: undefined,
        description: undefined,
        images: [],
        brand: undefined,
        price: undefined,
        currency: undefined,
        url,
      };
    const result = await fetch(url);

    // Load html content into cheerio
    const $ = load(await result.text());

    // Find ldJSON
    const ldJSONText = $(`script[type="application/ld+json"]`).text();

    try {
      const ldJSON: unknown = JSON.parse(ldJSONText);
      const parsedJson = scrapeLDJSONSchema.safeParse(ldJSON);

      if (parsedJson.success) {
        const data = parsedJson.data;
        scrapedProductData.name = data.name;
        scrapedProductData.description = data.description;
        const ldJsonImage = data.image;
        if (ldJsonImage) {
          scrapedProductData.images?.push(ldJsonImage);
        }
        scrapedProductData.price = data.offers.price;
        scrapedProductData.currency = data.offers.priceCurrency;
        scrapedProductData.brand = data.brand?.name;
      }
    } catch (e) {
      // Error finding ldJson
    }

    return scrapedProductData;
  },
);

export const updateProduct = makeProtectedAction(
  productSchema,
  async (product, { session }) => {
    await db
      .update(products)
      .set(product)
      .where(
        and(
          eq(products.createdById, session.user.id),
          eq(products.id, product.id),
        ),
      );

    return {
      message: "success",
    };
  },
);

export const commitToProduct = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }, { session }) => {
    const dbProduct = await getProduct({ productId });

    if (!dbProduct) {
      throw new Error("Product doesn't exist");
    }

    const dbShares = await db.query.wishlistShares.findFirst({
      where: and(
        eq(wishlistShares.wishlistId, dbProduct.wishlistId),
        or(
          eq(wishlistShares.sharedWithUserId, session.user.id),
          eq(wishlistShares.createdById, session.user.id),
        ),
      ),
    });

    if (!dbShares) {
      throw new Error("Access denied");
    }

    await db.insert(productCommitments).values({
      createdById: session.user.id,
      productId: dbProduct.id,
      wishlistId: dbProduct.wishlistId,
      id: randomUUID(),
    });

    return {
      message: "success",
    };
  },
);

export const uncommitToProduct = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }, { session }) => {
    await db
      .delete(productCommitments)
      .where(
        and(
          eq(productCommitments.productId, productId),
          eq(productCommitments.createdById, session.user.id),
        ),
      );

    return {
      message: "success",
    };
  },
);

export const getProductCommitments = makeProtectedAction(
  z.object({
    productId: z.string(),
  }),
  async ({ productId }) => {
    const dbCommitments = await db.query.productCommitments.findMany({
      where: and(
        eq(productCommitments.productId, productId),
        // eq(productCommitments.createdById, session.user.id),
      ),
      with: {
        user: true,
      },
    });

    return dbCommitments;
  },
);
