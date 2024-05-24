"use client";
import { DoorOpen, Loader } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const SignOutButton = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <button
      onClick={async () => {
        setIsSigningOut(true);
        await signOut({ callbackUrl: "/" });
      }}
      className="group flex h-8 w-fit items-center gap-2 rounded-md px-2 text-xl font-medium transition-colors  hover:bg-blue-200 data-[selected=active]:bg-green-200"
    >
      {isSigningOut ? (
        <Loader width={20} height={20} className="animate-spin" />
      ) : (
        <DoorOpen size={20} />
      )}{" "}
      <span>Sign Out </span>
    </button>
  );
};

export default SignOutButton;
