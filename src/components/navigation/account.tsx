"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
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
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signin">Log In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAccount;
