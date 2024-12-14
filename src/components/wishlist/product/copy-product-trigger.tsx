import { productToCopyAtom, productToEditAtom } from "~/store/product-settings";

import { useSetAtom } from "jotai";
import { isProductCopyOpenAtom } from "~/store/product-settings";
import { Button } from "~/components/ui/button";
import type { WishlistProduct } from "~/types/wishlist";
import CopyProductSheet from "../wishlist/add-product/copy-product";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { CopyPlusIcon } from "lucide-react";

type CopyProductTriggerProps = {
  product: WishlistProduct;
};

export const CopyProductTrigger = ({ product }: CopyProductTriggerProps) => {
  const setProductToCopy = useSetAtom(productToCopyAtom);
  const setIsProductCopyOpen = useSetAtom(isProductCopyOpenAtom);
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 rounded-md border-2 border-black p-4">
      <CopyProductSheet />
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-2xl font-medium">Copy Product</h2>
          <p className="text-pretty leading-tight">
            {" "}
            Copy this product to another wishlist
          </p>
        </div>
        <ColoredIconWrapper>
          <CopyPlusIcon size={20} />
        </ColoredIconWrapper>
      </div>
      <Button
        variant="secondary"
        className="w-fit"
        onClick={() => {
          setProductToCopy(product);
          setIsProductCopyOpen(true);
        }}
      >
        Make a copy
      </Button>
    </div>
  );
};
