"use client";
import { DoorOpen, Loader, LogInIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

type SignInOutButtonProps = {
  isSignedIn: boolean;
};
const SignInOutButton = ({ isSignedIn }: SignInOutButtonProps) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <button
      onClick={async () => {
        if (isSignedIn) {
          setIsSigningOut(true);
          await signOut({ callbackUrl: "/" });
        } else {
          redirect("/auth/sign-in");
        }
      }}
      className="group flex h-8 w-fit items-center gap-2 rounded-md px-2 text-xl font-medium transition-colors  hover:bg-blue-200 data-[selected=active]:bg-green-200"
    >
      {isSignedIn ? (
        isSigningOut ? (
          <Loader width={20} height={20} className="animate-spin" />
        ) : (
          <DoorOpen size={20} />
        )
      ) : (
        <LogInIcon size={20} />
      )}{" "}
      <span>{isSignedIn ? "Sign Out" : "Sign In"}</span>
    </button>
  );
};

export default SignInOutButton;
