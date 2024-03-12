"use client";

import { useEffect, useOptimistic, useState } from "react";
import { useFormState } from "react-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { privacyTypeSchema } from "~/schema/wishlist/wishlist";
import { setPrivacyType } from "~/server/actions/wishlist";
import type { WishlistPrivacy } from "~/types/wishlist";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

type PrivacyProps = {
  privacyType: WishlistPrivacy;
  wishlistId: string;
};

const Privacy = ({ privacyType, wishlistId }: PrivacyProps) => {
  const [privacyTypeInput, setPrivacyTypeInput] = useOptimistic(privacyType);
  const { result, execute } = useAction(setPrivacyType);
  const router = useRouter();

  const handleSelectPrivacyType = async (value: string) => {
    const parsedValue = privacyTypeSchema.parse(value);
    setPrivacyTypeInput(parsedValue);
    execute({
      privacyType: parsedValue,
      wishlistId,
    });
  };

  useEffect(() => {
    if (result.data?.message === "success") {
      router.refresh();
    }
  }, [result, router]);

  return (
    <section className="space-y-2 pb-4">
      <h2 className="text-lg font-medium"> Visibility </h2>
      <Select value={privacyTypeInput} onValueChange={handleSelectPrivacyType}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};

export default Privacy;
