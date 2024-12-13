import { Commitments } from "~/components/commitments";
import { CommitmentsTitleBar } from "~/components/commitments/commitments-title-bar";

import { getUserCommitments } from "~/server/actions/commitments";
import type { CommitmentWithProduct } from "~/types/commitments";

const MyCommitmentsPage = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const commitments = await getUserCommitments({
    search: searchParams.search,
  });
  const groupedCommitments = commitments.reduce(
    (acc, commitment) => {
      if (!acc[commitment.product.wishlistId]) {
        acc[commitment.product.wishlistId] = [];
      }
      acc[commitment.product.wishlistId]?.push(commitment);
      return acc;
    },
    {} as Record<string, CommitmentWithProduct[]>,
  );

  return (
    <>
      <CommitmentsTitleBar />
      <Commitments commitments={groupedCommitments} />
    </>
  );
};

export default MyCommitmentsPage;
