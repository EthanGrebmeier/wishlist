"use client";

import { RefreshCcw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitButton } from "~/components/ui/submit-button";
import { Tooltip } from "~/components/ui/tooltip";
import { generateMagicLink } from "~/server/actions/wishlist";

type ResetLinkProps = {
  wishlistId: string;
};

const ResetLink = ({ wishlistId }: ResetLinkProps) => {
  const router = useRouter();
  const { execute } = useAction(generateMagicLink, {
    onSuccess: () => router.refresh(),
  });
  return (
    <form action={() => execute({ wishlistId })}>
      <Tooltip text="Reset Link">
        <SubmitButton
          icon={<RefreshCcw size={20} />}
          variant="ghost"
          className="border-l-2 border-l-black  transition-colors  hover:bg-red-300"
        >
          {" "}
        </SubmitButton>
      </Tooltip>
    </form>
  );
};

export default ResetLink;
