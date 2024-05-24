"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Delete from "./delete";
import MenuProvider from "./menuProvider";
import type { Wishlist } from "~/types/wishlist";

type WishlistMenuProps = {
  wishlist: Wishlist;
};

const WishlistMenu = ({ wishlist }: WishlistMenuProps) => {
  return (
    <MenuProvider wishlist={wishlist}>
      <DropdownMenu key={wishlist.id}>
        <DropdownMenuTrigger asChild>
          <button className="group w-full justify-between rounded-md border-2 border-black bg-background p-1 text-xl font-medium transition-all hover:bg-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {" "}
            <MoreHorizontal size={15} />{" "}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Delete />
        </DropdownMenuContent>
      </DropdownMenu>
    </MenuProvider>
  );
};

export default WishlistMenu;
