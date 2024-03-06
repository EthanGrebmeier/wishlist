"use client";
import { useFormState } from "react-dom";
import { deleteProduct } from "~/app/wishlist/[wishlistId]/actions";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useProductMenu } from "./menuProvider";

const Delete = () => {
  const [state, action] = useFormState(deleteProduct, null);
  const { product, wishlistId } = useProductMenu();

  if (!product || !wishlistId) return;

  const actionWithProductId = action.bind(null, {
    productId: product.id,
    wishlistId,
  });

  return (
    <form action={actionWithProductId}>
      <DropdownMenuItem asChild className="text-red-500">
        <button className="w-full bg-none outline-none">Delete</button>
      </DropdownMenuItem>
    </form>
  );
};

export default Delete;
