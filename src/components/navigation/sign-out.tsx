"use client";
import { DoorOpen, Loader, LogInIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

type SignInOutButtonProps = {
  isSignedIn: boolean;
  className: string;
};
const SignInOutButton = ({ isSignedIn, className }: SignInOutButtonProps) => {
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
      className={className}
    >
      {isSignedIn ? (
        isSigningOut ? (
          <Loader width={24} height={24} className="animate-spin" />
        ) : (
          <DoorOpen size={24} />
        )
      ) : (
        <LogInIcon size={24} />
      )}{" "}
      <span>{isSignedIn ? "Sign Out" : "Sign In"}</span>
    </button>
  );
};

export default SignInOutButton;
