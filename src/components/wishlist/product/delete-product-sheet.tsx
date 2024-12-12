"use client";
import { deleteProduct } from "~/server/actions/product";

import { Button } from "~/components/ui/button";
import { SubmitButton } from "~/components/ui/submit-button";
import { useEffect } from "react";

import { useAction } from "next-safe-action/hooks";
import { Trash2 } from "lucide-react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import { useAtom } from "jotai";
import {
  isProductDeleteOpenAtom,
  productToDeleteAtom,
} from "~/store/product-settings";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

const DeleteProductSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isProductDeleteOpenAtom);
  const { execute } = useAction(deleteProduct, {
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const [product, setProduct] = useAtom(productToDeleteAtom);

  useEffect(() => {
    if (!isOpen) setProduct(null);
  }, [isOpen, setProduct]);

  if (!product) return;

  const actionWithProductId = () => {
    execute({
      productId: product.id,
      wishlistId: product.wishlistId,
    });
  };

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete Product"
      titleIcon={
        <ColoredIconWrapper className="bg-red-500">
          <Trash2 size={20} />
        </ColoredIconWrapper>
      }
    >
      <div className="flex flex-col gap-2 pb-4">
        <p className="text-pretty text-lg font-medium leading-tight">
          Are you sure you would like to delete{" "}
          <span className="font-bold">{product.name}</span>?
        </p>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone
        </p>
        <div className="flex w-full items-center justify-between">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <form action={actionWithProductId}>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </div>
      </div>
    </ResponsiveSheet>
  );
};

export default DeleteProductSheet;
