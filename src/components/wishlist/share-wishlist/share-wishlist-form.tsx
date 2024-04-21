"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import UserAutocomplete from "./user-autocomplete";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
      className="relative"
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {" "}
          <label className="text-lg font-medium" htmlFor="email">
            Find User By Email
          </label>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <HelpCircle size={20} />
              </TooltipTrigger>
              <TooltipContent>Email must be an exact match</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          name="email"
          type="text"
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
