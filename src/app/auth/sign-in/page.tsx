import React from "react";
import { getProviders } from "next-auth/react";
import ProviderList from "~/components/auth/provider-list";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Logo from "~/components/navigation/logo";
import Link from "next/link";
import { X } from "lucide-react";

const SignIn = async () => {
  const providers = await getProviders();
  const magicLinkId = cookies().get("magicLinkId")?.value;

  const serverSession = await getServerAuthSession();

  if (serverSession?.user) {
    redirect("/");
  }

  if (!providers) return;

  return (
    <div className="relative flex h-screen w-full flex-col  items-center justify-center bg-background">
      <div className="absolute right-4 top-4">
        <Link href="/">
          <X size={40} />
        </Link>
      </div>
      <div className="w-fit">
        <Logo size={"large"} />
      </div>
      <div className="mt-4 flex flex-col items-center gap-4 rounded-md">
        <h1 className="font-serif text-4xl">Sign In</h1>
        <ProviderList magicLinkId={magicLinkId} providers={providers} />
      </div>
    </div>
  );
};

export default SignIn;
