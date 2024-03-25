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
          <button className="rounded-md p-2 transition-all hover:bg-slate-300">
            {" "}
            <MoreHorizontal width={20} height={20} />{" "}
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
