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
import { AnimatePresence, motion } from "framer-motion";

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
    const isInputValidEmail = debouncedInput.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    isOpen &&
      debouncedInput &&
      isInputValidEmail &&
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

  return (
    <AnimatePresence mode="popLayout">
      {debouncedInput && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          onFocus={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          data-state={isOpen ? "open" : "closed"}
        >
          <div className="relative rounded-md border border-black bg-white px-4 py-6">
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
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-xl font-medium"> {matchingUser.name}</p>
                  <p className="font-sm"> {matchingUser.email}</p>
                </div>
                {matchingUser.isShared ? (
                  <p> Shared </p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserAutocomplete;
