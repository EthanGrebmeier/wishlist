"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { env } from "process";

type ProviderListProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  magicLinkId?: string;
};

const ProviderList = ({ providers, magicLinkId }: ProviderListProps) => {
  const linkBase = env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000";

  const callbackUrl =
    linkBase + (magicLinkId ? `/wishlist/join/${magicLinkId}` : "");

  return (
    <div className="flex flex-col items-center gap-4">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <Button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl,
              })
            }
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
export default ProviderList;
