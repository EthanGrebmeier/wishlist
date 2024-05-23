"use client";
import { DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="group flex h-8 w-fit items-center gap-2 rounded-md px-2 text-xl font-medium transition-colors  hover:bg-blue-200 data-[selected=active]:bg-green-200"
    >
      <DoorOpen size={20} /> <span>Sign Out </span>
    </button>
  );
};

export default SignOutButton;
