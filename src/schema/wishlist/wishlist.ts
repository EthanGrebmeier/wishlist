import { z } from "zod";

export const privacyTypeSchema = z.union([
  z.literal("private"),
  z.literal("public"),
  z.literal("link"), // TODO: Support link sharing
]);
export const shareWishlistInputSchema = z.object({
  wishlistId: z.string(),
  sharedWithUserId: z.string(),
});

export const shareWishlistEmailInputSchema = z.object({
  email: z.string(),
});
