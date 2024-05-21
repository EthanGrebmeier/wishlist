"use client";

import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { findUserByEmail } from "~/server/actions/account";
import { Button } from "~/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";
import { shareWishlistEmail } from "~/server/actions/wishlist";

type UserAutocompleteProps = {
  email: string;
  wishlistId: string;
  onSuccess?: () => void;
  isOpen: boolean;
};

const UserAutocomplete = ({
  email,
  wishlistId,
  onSuccess,
  isOpen,
}: UserAutocompleteProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { result: shareWishlistResult, execute: executeShareWishlist } =
    useAction(shareWishlistEmail);
  const [debouncedInput] = useDebounceValue(email, 500);
  const {
    status: findUserByEmailStatus,
    result: findUserByEmailResult,
    execute: executeFindUserByEmail,
  } = useAction(findUserByEmail);
  const router = useRouter();

  const matchingUser = findUserByEmailResult.data;

  useEffect(() => {
    if (isOpen && email) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 120);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, email]);

  useEffect(() => {
    isOpen &&
      executeFindUserByEmail({
        email: debouncedInput.toLowerCase(),
        wishlistId,
      });
  }, [debouncedInput, executeFindUserByEmail, wishlistId, isOpen]);

  useEffect(() => {
    if (shareWishlistResult.data?.message === "success") {
      onSuccess && onSuccess();
      executeFindUserByEmail({
        email: debouncedInput.toLowerCase(),
        wishlistId,
      });
      router.refresh();
    }
  }, [
    shareWishlistResult,
    onSuccess,
    router,
    debouncedInput,
    wishlistId,
    executeFindUserByEmail,
  ]);

  if (!shouldRender) return;

  return (
    <div
      onFocus={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      className="bottom-100 absolute left-0 right-0 translate-y-[8px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="relative rounded-md border-2 border-black bg-white px-4 py-6">
        {findUserByEmailStatus === "executing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/60">
            {" "}
            <Loader className="animate-spin" height={20} width={20} />{" "}
          </div>
        )}
        {matchingUser ? (
          <form
            action={() =>
              executeShareWishlist({
                sharedWithUserId: matchingUser?.id,
                wishlistId,
              })
            }
            className="flex items-center justify-between overflow-hidden   "
          >
            <div>
              <p className="text-xl font-medium"> {matchingUser.name}</p>
              <p className="font-sm"> {matchingUser.email}</p>
            </div>
            {matchingUser.isShared ? (
              <Button disabled type="button" aria-disabled="true">
                {" "}
                Shared{" "}
              </Button>
            ) : (
              <SubmitButton variant="default">Share</SubmitButton>
            )}
          </form>
        ) : (
          <div className="py-3">
            <p> No user found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAutocomplete;
