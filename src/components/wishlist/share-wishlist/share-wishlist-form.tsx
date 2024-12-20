"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import UserAutocomplete from "./user-autocomplete";

type ShareWishlistFormProps = {
  onSuccess?: () => void;
  wishlistId: string;
};

const ShareWishlistForm = ({
  onSuccess,
  wishlistId,
}: ShareWishlistFormProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="[&>* data-lastpass-icon-root]:hidden relative flex flex-col gap-2"
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <div className=" flex flex-col gap-2">
        <div className="flex flex-col">
          {" "}
          <label className="text-lg font-medium" htmlFor="email-search">
            Find User By Email
          </label>
          <p className="text-sm tracking-tight">
            {" "}
            Email must be an exact match{" "}
          </p>
        </div>
        <Input
          data-1p-ignore
          data-lpignore
          name="email-search"
          id="email-search"
          type="search"
          onChange={(e) => setEmailInput(e.target.value)}
          value={emailInput}
          autoComplete="off"
        />
      </div>
      <UserAutocomplete
        onSuccess={onSuccess}
        wishlistId={wishlistId}
        email={emailInput}
        isOpen={isOpen}
      />
    </div>
  );
};

export default ShareWishlistForm;
