"use client";

import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useAtom } from "jotai";

import ResponsiveSheet from "~/components/ui/responsive-sheet";
import {
  isWishlistSettingsOpenAtom,
  wishlistToEditAtom,
} from "~/store/wishlist-settings";
import WishlistSettingsForm, { WishlistSettingsFooter } from "./form";
import { WishlistSettingsFormProvider } from "./context";

const WishlistSettingsSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isWishlistSettingsOpenAtom);
  const [wishlistToEdit, setWishlistToEdit] = useAtom(wishlistToEditAtom);
  const isEditing = !!wishlistToEdit;

  useEffect(() => {
    if (!isOpen) {
      setWishlistToEdit(null);
    }
  }, [isOpen]);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
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

type WishlistSettingsNavigationContextType = {
  frame: string;
  setFrame: Dispatch<SetStateAction<string>>;
};

const WishlistSettingsNavigationContext =
  createContext<WishlistSettingsNavigationContextType | null>(null);

export const WishlistSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [frame, setFrame] = useState("form");
  return (
    <WishlistSettingsNavigationContext.Provider value={{ frame, setFrame }}>
      {children}
    </WishlistSettingsNavigationContext.Provider>
  );
};

export const useWishlistSettingsNavigation = () => {
  const context = useContext(WishlistSettingsNavigationContext);
  if (!context) {
    throw new Error(
      "useWishlistSettingsNavigation must be used within a WishlistSettingsProvider",
    );
  }
  return context;
};

export default WishlistSettingsSheet;
