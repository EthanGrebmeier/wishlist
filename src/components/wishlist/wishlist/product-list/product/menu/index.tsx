"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Delete from "./delete";
import EditProduct from "./edit";

const ProductMenu = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
        <Button variant="ghost">
          {" "}
          <MoreHorizontal width={20} height={20} />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Delete />
        <EditProduct />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductMenu;
