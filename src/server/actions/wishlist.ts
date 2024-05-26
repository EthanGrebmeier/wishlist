"use server";

import { z } from "zod";
import {
  checkUserIsWishlistEditor,
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
import { getServerAuthSession } from "../auth";
import { cookies } from "next/headers";
import { shareWishlistInputSchema } from "~/schema/wishlist/wishlist";
import { Resend } from "resend";
import { env } from "~/env";
import InviteEmail from "~/email/invite";
import { generateId } from "~/lib/utils";
import { users } from "~/server/db/schema/users";

export const deleteWishlist = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    try {
      const wishlist = await getWishlist({
        wishlistId,
      });

      // Only allow this action if the user is the Owner of the wishlist
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
        type: "editor",
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
    wishlistName: z.string().min(1),
    date: z.date().optional(),
    color: colorSchema,
    isSecret: z.boolean(),
    imageUrl: z.string().optional(),
  }),
  async (
    { wishlistName, date, color, isSecret, id, imageUrl },
    { session },
  ) => {
    // ensure user is an editor of the wishlist
    await checkUserIsWishlistEditor({
      wishlistId: id,
      session,
    });

    const wishlistValues = {
      name: wishlistName,
      dueDate: date?.toDateString() ?? null,
      color,
      isSecret,
      imageUrl,
    };
    try {
      await db
        .update(wishlists)
        .set(wishlistValues)
        .where(eq(wishlists.id, id));
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

    // Check if wishlist is already shared with user
    const existingShare = await db.query.wishlistShares.findFirst({
      where: and(
        eq(wishlistShares.sharedWithUserId, session.user.id),
        eq(wishlistShares.wishlistId, wishlist.id),
      ),
    });

    if (existingShare) {
      // If we sent them an email invite, make them a viewer
      if (existingShare.type === "invitee") {
        await db
          .update(wishlistShares)
          .set({
            type: "viewer",
          })
          .where(eq(wishlistShares.id, existingShare.id));
      }

      // Redirect them to the wishlist
      redirect(`/wishlist/${wishlist.id}`);
    } else {
      // Make the user a viewer
      await db.insert(wishlistShares).values({
        id: generateId(),
        createdById: wishlist?.createdById,
        sharedWithUserId: session.user.id,
        wishlistId: magicLinkEntry.wishlistId,
      });
    }

    console.log("JUST CREATED");
    redirect(`/wishlist/${wishlist.id}`);
  },
);

export const generateMagicLink = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
  }),
  async ({ wishlistId }, { session }) => {
    // ensure user is an editor of the wishlist
    await checkUserIsWishlistEditor({
      wishlistId,
      session,
    });

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
    // ensure user is an editor of the wishlist
    await checkUserIsWishlistEditor({
      wishlistId: wishlistId,
      session,
    });

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

export const shareWishlistEmail = makeProtectedAction(
  shareWishlistInputSchema,
  async (input, { session }) => {
    const { wishlistId } = input;

    // ensure user is an editor of the wishlist
    const matchingWishlist = await checkUserIsWishlistEditor({
      wishlistId: wishlistId,
      session,
    });

    try {
      const userToShareWith = await db.query.users.findFirst({
        where: eq(users.id, input.sharedWithUserId),
      });

      if (!userToShareWith) {
        throw new Error("Could not find user");
      }

      const magicLink = await db.query.magicWishlistLinks.findFirst({
        where: eq(magicWishlistLinks.wishlistId, matchingWishlist.id),
      });

      if (!magicLink) {
        return {
          message: "Unable to share wishlist",
        };
      }

      const resend = new Resend(env.RESEND_API_KEY);

      const email = await resend.emails.send({
        from: "invite@fillaneed.xyz",
        to: userToShareWith.email,
        subject: "You've been invited to join a wishlist!",
        react: InviteEmail({
          toUser: userToShareWith,
          fromUser: session.user,
          url: `/wishlist/join/${magicLink.id}`,
          wishlist: matchingWishlist,
        }),
      });

      if (email.error) {
        console.log(email.error);
        return {
          message: "Internal Server Error",
        };
      }

      const wishlistShareId = generateId();

      await db.insert(wishlistShares).values({
        ...input,
        id: wishlistShareId,
        createdById: session.user.id,
        type: "invitee",
      });
    } catch (e) {
      console.log("Error sharing wishlist", e);
      return {
        message: "Internal Server Error",
      };
    }

    return {
      message: "success",
    };
  },
);

export const setSharedUserType = makeProtectedAction(
  z.object({
    wishlistId: z.string(),
    sharedUserId: z.string(),
    shareType: z.union([z.literal("viewer"), z.literal("editor")]),
  }),
  async ({ shareType, sharedUserId, wishlistId }, { session }) => {
    const wishlist = await checkUserIsWishlistEditor({
      session,
      wishlistId,
    });

    // We actually only want to allow the wishlist owner to adjust permissions.
    // Throw error if the user is not the owner
    if (wishlist.createdById !== session.user.id) {
      throw new Error("Access Denied");
    }

    const updatedShare = await db
      .update(wishlistShares)
      .set({
        type: shareType,
      })
      .where(
        and(
          eq(wishlistShares.wishlistId, wishlist.id),
          eq(wishlistShares.sharedWithUserId, sharedUserId),
        ),
      );

    console.log(updatedShare);
  },
);

export const unshareWishlist = makeProtectedAction(
  shareWishlistInputSchema,
  async ({ sharedWithUserId, wishlistId }, { session }) => {
    try {
      await checkUserIsWishlistEditor({ wishlistId, session });
      await db
        .delete(wishlistShares)
        .where(
          and(
            eq(wishlistShares.createdById, session.user.id),
            eq(wishlistShares.sharedWithUserId, sharedWithUserId),
            eq(wishlistShares.wishlistId, wishlistId),
          ),
        );
    } catch (e) {
      console.log("Error unsharing wishlist ", e);
      return {
        message: "Internal Server Error",
      };
    }

    return {
      message: "success",
    };
  },
);
