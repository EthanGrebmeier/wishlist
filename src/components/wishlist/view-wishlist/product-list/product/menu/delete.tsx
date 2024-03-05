"use client";
import { useFormState } from "react-dom";
import { deleteProduct } from "~/app/wishlist/[wishlistId]/actions";
import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useMenu } from "./menuProvider";

const Delete = () => {
  const [state, action] = useFormState(deleteProduct, null);
  const { productId, wishlistId } = useMenu();

  const actionWithProductId = action.bind(null, {
    productId,
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
