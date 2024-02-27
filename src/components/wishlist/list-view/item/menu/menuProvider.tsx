"use client";

import { createContext, useContext } from "react";
import { type Wishlist } from "~/types/wishlist";

const MenuContext = createContext<{
  wishlist?: Wishlist;
}>({ wishlist: undefined });

type MenuProviderProps = {
  children: JSX.Element;
  wishlist?: Wishlist;
};

const MenuProvider = ({ children, wishlist }: MenuProviderProps) => {
  return (
    <MenuContext.Provider
      value={{
        wishlist,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useWishlistMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu can only be used within a menu context provider");
  }

  return context;
};

export default MenuProvider;
