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
import { useProductMenu } from "./menuProvider";

const ProductMenu = () => {
  const { product } = useProductMenu();
  if (!product) return;
  return (
    <DropdownMenu key={product.id} modal={false}>
      <DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
        <button className="group w-full justify-between rounded-md border-2 border-black bg-background p-2 text-xl font-medium transition-all hover:bg-green-200">
          {" "}
          <MoreHorizontal width={20} height={20} />{" "}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Delete />
        <EditProduct />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductMenu;
