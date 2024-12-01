import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import {
  isProductDeleteOpenAtom,
  productToDeleteAtom,
} from "~/store/product-settings";
import { useProductMenu } from "./menuProvider";

export const ProductDeleteMenuItem = () => {
  const { product } = useProductMenu();
  const setIsDeleteProductOpen = useSetAtom(isProductDeleteOpenAtom);
  const setProductToDelete = useSetAtom(productToDeleteAtom);

  if (!product) return;

  return (
    <DropdownMenuItem
      className="text-red-500"
      onClick={() => {
        setIsDeleteProductOpen(true);
        setProductToDelete(product);
      }}
    >
      Delete Product
    </DropdownMenuItem>
  );
};
