"use server";

import { z } from "zod";
import {
  makeProtectedAction,
  makeSafeAction,
} from "~/lib/actions/protectedAction";
import { colorSchema, privacyTypeSchema } from "~/schema/wishlist/wishlist";
import { db } from "../db";
import {
  magicWishlistLinks,
  products,
  wishlistShares,
  wishlists,
} from "../db/schema/wishlist";
import { and, eq } from "drizzle-orm";
import { getWishlist } from "~/lib/wishlist/getWishlist";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteFile } from "../uploadthing";
import { generateId } from "~/lib/utils";
import { getServerAuthSession } from "../auth";
import { cookies } from "next/headers";

export const deleteWishlist = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    try {
      const wishlist = await getWishlist({
        wishlistId,
      });

      if (wishlist.createdById !== session.user.id) {
        return {
          message: "Access Denied",
        };
      }

      // First we need to clean up all child products

      // Step 1. Delete product images

      // Get products with images URLs
      const productImageUrls = wishlist.products
        .map((product) => product.imageUrl)
        .filter(Boolean);

      const deleteProductImages = Promise.all(productImageUrls.map(deleteFile));

      // Step 2. Delete product objects
      const deleteProducts = db
        .delete(products)
        .where(eq(products.wishlistId, wishlistId));

      // Step 3. Delete Wishlist Shares
      const deleteShares = db
        .delete(wishlistShares)
        .where(eq(wishlistShares.wishlistId, wishlistId));

      // Step 4. Delete Wishlist Image
      const deleteWishlistImage = deleteFile(wishlist.imageUrl);

      // Wait for all promises to resolve
      await Promise.all([
        deleteProductImages,
        deleteProducts,
        deleteShares,
        deleteWishlistImage,
      ]);

      // Step 5. Delete Wishlist
      await db.delete(wishlists).where(eq(wishlists.id, wishlistId));

      revalidatePath(`/wishlist`);

      return {
        message: "success",
      };
    } catch (e) {
      console.error("Error deleting wishlist", e);
      return {
        message: "Unable to delete wishlist",
      };
    }
  },
);

export const createWishlist = makeProtectedAction(
  z.object({
    wishlistName: z.string().min(1),
    date: z.date().optional(),
    imageUrl: z.string().optional(),
    isSecret: z.boolean(),
    color: colorSchema,
  }),
  async ({ wishlistName, date, color, isSecret, imageUrl }, { session }) => {
    const wishlistValues = {
      createdById: session.user.id,
      name: wishlistName,
      id: generateId(),
      dueDate: date?.toDateString(),
      color,
      isSecret,
      imageUrl,
    };
    try {
      await db.insert(wishlists).values(wishlistValues);

      await db.insert(wishlistShares).values({
        createdById: session.user.id,
        wishlistId: wishlistValues.id,
        sharedWithUserId: session.user.id,

        id: generateId(),
      });
    } catch (e) {
      console.error(e);
      return {
        message: "Could not insert wishlist",
      };
    }

    redirect(`/wishlist/${wishlistValues.id}`);
  },
);

export const updateWishlist = makeProtectedAction(
  z.object({
    id: z.string(),
    wishlistName: z.string(),
    date: z.date().optional(),
    color: colorSchema,
    isSecret: z.boolean(),
    imageUrl: z.string().optional(),
  }),
  async (
    { wishlistName, date, color, isSecret, id, imageUrl },
    { session },
  ) => {
    // ensure user is the owner of the wishlist

    const wishlist = await getWishlist({
      wishlistId: id,
    });

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    const wishlistValues = {
      name: wishlistName,
      dueDate: date?.toDateString(),
      color,
      isSecret,
      imageUrl,
    };
    try {
      await db
        .update(wishlists)
        .set(wishlistValues)
        .where(
          and(eq(wishlists.id, id), eq(wishlists.createdById, session.user.id)),
        );
    } catch (e) {
      console.error(e);
      throw new Error("Could not update wishlist");
    }
  },
);

const inputSchema = z.object({
  wishlistId: z.string(),
  privacyType: privacyTypeSchema,
});

export const setPrivacyType = makeProtectedAction(
  inputSchema,
  async (formData, { session }) => {
    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.id, formData.wishlistId),
    });

    if (!wishlist) {
      return {
        message: "Wishlist not found",
      };
    }

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    await db
      .update(wishlists)
      .set({
        ...wishlist,
        privacyType: formData.privacyType,
      })
      .where(eq(wishlists.id, formData.wishlistId));

    return {
      message: "success",
    };
  },
);

export const updateTitle = makeProtectedAction(
  z.object({
    title: z.string(),
    wishlistId: z.string(),
  }),
  async ({ title, wishlistId }, { session }) => {
    // ensure user is the owner of the wishlist

    const wishlist = await getWishlist({
      wishlistId,
    });

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    await db
      .update(wishlists)
      .set({
        name: title,
      })
      .where(
        and(
          eq(wishlists.id, wishlistId),
          eq(wishlists.createdById, session.user.id),
        ),
      );
  },
);

export const joinWishlistViaMagicLink = makeSafeAction(
  z.object({
    magicLinkId: z.string(),
  }),
  async ({ magicLinkId }) => {
    console.log("JOINING", magicLinkId);
    const session = await getServerAuthSession();

    if (!session) {
      cookies().set("magicLinkId", magicLinkId);

      redirect("/auth/sign-in");
    }

    // get entry associated with magic link
    const magicLinkEntry = await db.query.magicWishlistLinks.findFirst({
      where: eq(magicWishlistLinks.id, magicLinkId),
    });

    if (!magicLinkEntry) {
      console.log("NO MAGIC LINk");
      redirect("/");
    }

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.id, magicLinkEntry.wishlistId),
    });

    if (!wishlist) {
      throw new Error("Wishlist could not be found. This should never happen");
    }

    cookies().delete("magicLinkId");

    // Check that user isn't owner of list
    if (wishlist.createdById === session.user.id) {
      console.log("OWNER");
      redirect(`/wishlist/${wishlist.id}`);

      // return {
      //   message: "success",
      //   wishlistId: wishlist.id,
      // };
    }

    // Ensure wishlist isn't already shared with user
    const existingShare = await db.query.wishlistShares.findFirst({
      where: and(
        eq(wishlistShares.sharedWithUserId, session.user.id),
        eq(wishlistShares.wishlistId, wishlist.id),
      ),
    });

    if (existingShare) {
      console.log("EXISTING");
      redirect(`/wishlist/${wishlist.id}`);
    }

    // Share wishlist with user
    await db.insert(wishlistShares).values({
      id: generateId(),
      createdById: wishlist?.createdById,
      sharedWithUserId: session.user.id,
      wishlistId: magicLinkEntry.wishlistId,
    });

    console.log("JUST CREATED");
    redirect(`/wishlist/${wishlist.id}`);
  },
);

export const generateMagicLink = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    // ensure user is the owner of the wishlist

    const wishlist = await getWishlist({
      wishlistId,
    });

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    // Delete the row for the existing magic wishlist link
    await db
      .delete(magicWishlistLinks)
      .where(eq(magicWishlistLinks.wishlistId, wishlistId));

    // Create new magic link
    const newLink = await db
      .insert(magicWishlistLinks)
      .values({
        createdById: session.user.id,
        wishlistId,
        id: generateId(),
      })
      .returning();

    return {
      message: "success",
      magicLink: newLink[0],
    };
  },
);

export const getMagicLink = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    // ensure user is the owner of the wishlist

    const wishlist = await getWishlist({
      wishlistId,
    });

    if (wishlist.createdById !== session.user.id) {
      return {
        message: "Access Denied",
      };
    }

    const magicLink = await db.query.magicWishlistLinks.findFirst({
      where: eq(magicWishlistLinks.wishlistId, wishlistId),
    });

    if (magicLink) {
      return {
        message: "success",
        magicLink,
      };
    } else {
      const newLink = await generateMagicLink({
        wishlistId,
      });

      if (!newLink.data?.magicLink) {
        throw new Error("Couldn't generate magic link");
      }

      return {
        message: "success",
        magicLink: newLink.data.magicLink,
      };
    }
  },
);
