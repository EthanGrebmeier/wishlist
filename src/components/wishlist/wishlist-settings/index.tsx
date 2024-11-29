"use client";

import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { useAtom, useSetAtom } from "jotai";

import ResponsiveSheet from "~/components/ui/responsive-sheet";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";
import WishlistSettingsForm, {
  WishlistSettingsFooter,
  WishlistSettingsFormProvider,
} from "./form";

const WishlistSettingsSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isWishlistSettingsOpenAtom);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Wishlist Settings"
      shouldPadBottomMobile
    >
      <WishlistSettingsFormProvider>
        <div className="flex flex-col pt-4">
          <WishlistSettingsForm />
        </div>
        <WishlistSettingsFooter />
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
