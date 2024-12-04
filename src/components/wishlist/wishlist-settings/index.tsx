"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";

import ResponsiveSheet from "~/components/ui/responsive-sheet";
import {
  isWishlistSettingsOpenAtom,
  wishlistToEditAtom,
} from "~/store/wishlist-settings";
import WishlistSettingsForm, { WishlistSettingsFooter } from "./form";
import { WishlistSettingsFormProvider } from "./context";
import { ScrollIcon, SettingsIcon } from "lucide-react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

const WishlistSettingsSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isWishlistSettingsOpenAtom);
  const [wishlistToEdit, setWishlistToEdit] = useAtom(wishlistToEditAtom);
  const isEditing = !!wishlistToEdit;

  useEffect(() => {
    if (!isOpen) {
      setWishlistToEdit(null);
    }
  }, [isOpen, setWishlistToEdit]);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleIcon={
        isEditing ? (
          <ColoredIconWrapper className="bg-purple-200">
            <SettingsIcon size={20} />
          </ColoredIconWrapper>
        ) : (
          <ColoredIconWrapper>
            <ScrollIcon size={20} />
          </ColoredIconWrapper>
        )
      }
      title={isEditing ? "Edit Wishlist" : "Create Wishlist"}
      shouldPadBottomMobile
    >
      <WishlistSettingsFormProvider>
        <div className="flex w-full flex-col ">
          <div className="flex w-full flex-col py-4">
            <WishlistSettingsForm />
          </div>
          <div
            style={{
              WebkitBackdropFilter:
                "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
            }}
            className="absolute bottom-0 left-0 right-0 flex h-16 flex-row items-center justify-between border-t border-black bg-transparent px-6 backdrop-blur-lg md:relative md:h-auto md:px-0  md:pt-4"
          >
            <WishlistSettingsFooter />
          </div>
        </div>
      </WishlistSettingsFormProvider>
    </ResponsiveSheet>
  );
};

export default WishlistSettingsSheet;
