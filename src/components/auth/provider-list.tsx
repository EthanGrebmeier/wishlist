"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader, UserCircle } from "lucide-react";

type ProviderListProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  magicLinkId?: string;
};

const ProviderList = ({ providers, magicLinkId }: ProviderListProps) => {
  const callbackUrl =
    magicLinkId && magicLinkId !== "undefined"
      ? `/wishlist/join/${magicLinkId}`
      : "/wishlist";

  return (
    <div className="flex flex-col items-center gap-4">
      {Object.values(providers)
        .sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0))
        .map((provider) => (
          <ProviderButton
            callbackUrl={callbackUrl}
            key={provider.id}
            provider={provider}
          />
        ))}
    </div>
  );
};

const ProviderButton = ({
  callbackUrl,
  provider,
}: {
  callbackUrl: string;
  provider: ClientSafeProvider;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        setIsLoading(true);
        await signIn(provider.id, {
          callbackUrl,
        });
      }}
      icon={
        isLoading ? (
          <Loader width={20} height={20} className="animate-spin" />
        ) : (
          <UserCircle />
        )
      }
    >
      Sign in with {provider.name}
    </Button>
  );
};

export default ProviderList;
