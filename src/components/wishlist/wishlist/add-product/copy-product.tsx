"use client";
import React, { useEffect, useState } from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";

import { CopyPlusIcon, PackagePlusIcon, PencilIcon } from "lucide-react";

import { useAtom } from "jotai";
import {
  isProductCopyOpenAtom,
  productToCopyAtom,
} from "~/store/product-settings";

import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

import { WishlistSelect } from "./wishlist-select";
import { useAction } from "next-safe-action/hooks";
import { copyProduct } from "~/server/actions/product";
import StatusButton from "~/components/ui/status-button";

const CopyProductSheet = () => {
  const [wishlistToCopyIntoId, setWishlistToCopyIntoId] = useState<
    string | null
  >(null);
  const [productToCopy, setProductToCopy] = useAtom(productToCopyAtom);
  const [isOpen, setIsOpen] = useAtom(isProductCopyOpenAtom);
  const { execute, status } = useAction(copyProduct, {
    onSuccess: () => {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setProductToCopy(null);
        setWishlistToCopyIntoId(null);
      }, 400);
    }
  }, [setProductToCopy, isOpen]);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleIcon={
        <ColoredIconWrapper className="bg-green-400">
          <CopyPlusIcon size={20} />
        </ColoredIconWrapper>
      }
      onClose={() => setProductToCopy(null)}
      title="Copy Product"
    >
      <div className="flex flex-col gap-4 pb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Copying {productToCopy?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Copying a product will create a new product in your wishlist.
          </p>
        </div>
        <WishlistSelect
          showWarning={false}
          wishlistId={wishlistToCopyIntoId}
          setWishlistId={setWishlistToCopyIntoId}
        />
        <StatusButton
          status={status}
          loadingContent={{ text: "Copying..." }}
          content={{ text: "Copy Product" }}
          hasSucceededContent={{ text: "Copied!" }}
          onClick={() => {
            console.log("copying product", productToCopy, wishlistToCopyIntoId);
            if (!wishlistToCopyIntoId || !productToCopy) return;
            execute({
              productId: productToCopy.id,
              wishlistId: wishlistToCopyIntoId,
            });
          }}
        >
          Copy Product
        </StatusButton>
      </div>
    </ResponsiveSheet>
  );
};

export default CopyProductSheet;
