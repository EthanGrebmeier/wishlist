"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DoorOpen, User } from "lucide-react";
import Link from "../ui/link";

type NavAccountProps = {
  isSignedIn: boolean;
};

const NavAccount = ({ isSignedIn }: NavAccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group w-full justify-between text-xl font-medium hover:bg-green-200"
          variant="ghost"
        >
          Account <User className="group-hover:animate-shake" size="20" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isSignedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/api/auth/signout"
                className="flex items-center justify-between"
              >
                <p> Log Out </p> <DoorOpen size={20} />
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/api/auth/sign-in">Log In</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAccount;
