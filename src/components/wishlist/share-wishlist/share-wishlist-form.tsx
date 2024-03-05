"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { shareWishlistInputSchema } from "~/schema/wishlist/wishlist";
import UserAutocomplete from "./user-autocomplete";

export const shareWishlistSchema = shareWishlistInputSchema.omit({
  wishlistId: true,
});

type ShareWishlistFormProps = {
  onSuccess?: () => void;
  wishlistId: string;
};

const ShareWishlistForm = ({
  onSuccess,
  wishlistId,
}: ShareWishlistFormProps) => {
  const [emailInput, setEmailInput] = useState("");
  return (
    <div className="relative">
      <div className="space-y-2">
        <label htmlFor="email">User Email</label>
        <Input
          name="email"
          type="text"
          onChange={(e) => setEmailInput(e.target.value)}
          value={emailInput}
        />
      </div>
      <UserAutocomplete
        onSuccess={onSuccess}
        wishlistId={wishlistId}
        email={emailInput}
      />
    </div>
  );
};

export default ShareWishlistForm;
