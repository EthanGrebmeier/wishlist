"use client";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import EditProduct from "./edit";
import { useProductMenu } from "./menuProvider";
import { ProductDeleteMenuItem } from "./delete-product";

const ProductMenu = () => {
  const { product } = useProductMenu();
  if (!product) return;
  return (
    <DropdownMenu key={product.id} modal={false}>
      <DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
        <button className="group w-full justify-between rounded-md border-2 border-black bg-background px-1 py-0.5 text-xl font-medium transition-all hover:bg-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {" "}
          <MoreHorizontal size={24} />{" "}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ProductDeleteMenuItem />
        <EditProduct />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductMenu;
