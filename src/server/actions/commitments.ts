"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";

import { getServerAuthSession } from "../auth";
import { productCommitments } from "../db/schema/wishlist";

export const getUserCommitments = async ({ search }: { search?: string }) => {
  const session = await getServerAuthSession();
  if (!session) {
    return [];
  }
  const commitments = await db.query.productCommitments.findMany({
    where: eq(productCommitments.createdById, session.user.id),
    with: {
      product: true,
      wishlist: {
        columns: {
          name: true,
          color: true,
          dueDate: true,
        },
      },
    },
  });

  // This is a bandaid until I can fix the orphaned commitments
  const filteredCommitments = commitments.filter(
    (commitment) =>
      commitment.product &&
      (commitment.wishlist.name
        .toLowerCase()
        .includes(search?.toLowerCase() ?? "") ||
        commitment.product.name
          .toLowerCase()
          .includes(search?.toLowerCase() ?? "")),
  );

  return filteredCommitments;
};
