"use client";

import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { User } from "~/types/user";
import { findUserByEmail } from "~/server/actions/account";
import { Button } from "~/components/ui/button";
import { useFormState } from "react-dom";
import { shareWishlist } from "~/app/wishlist/[wishlistId]/actions";

type UserAutocompleteProps = {
  email: string;
  wishlistId: string;
  onSuccess?: () => void;
};

const UserAutocomplete = ({
  email,
  wishlistId,
  onSuccess,
}: UserAutocompleteProps) => {
  const [response, formAction] = useFormState(shareWishlist, null);
  const [debouncedInput] = useDebounceValue(email, 500);
  const [matchingUser, setMatchingUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const getMatchingUsers = async () => {
      if (!debouncedInput) return;

      const matchingUser = await findUserByEmail(null, {
        email: debouncedInput,
      });

      setMatchingUser(matchingUser);
    };
    void getMatchingUsers();
  }, [debouncedInput]);

  useEffect(() => {
    if (response?.message === "success" && onSuccess) {
      onSuccess();
    }
  }, [response, onSuccess]);

  if (!matchingUser) return;

  const actionWithData = formAction.bind(null, {
    sharedWithUserId: matchingUser?.id,
    wishlistId,
  });

  return (
    <div className="bottom-100 absolute left-0 right-0 translate-y-[8px]">
      <form
        action={actionWithData}
        className="flex items-center justify-between overflow-hidden rounded-md border border-slate-200 bg-white px-4 py-6"
      >
        <div>
          <p> {matchingUser.name}</p>
          <p> {matchingUser.email}</p>
        </div>
        <Button className="w-fit">Share</Button>
      </form>
    </div>
  );
};

export default UserAutocomplete;
