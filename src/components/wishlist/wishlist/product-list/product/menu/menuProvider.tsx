"use client";

import { type ReactNode, createContext, useContext } from "react";
import type { WishlistProduct } from "~/types/wishlist";

const MenuContext = createContext<MenuProviderProps>({
  product: undefined,
  wishlistId: undefined,
});

type MenuProviderProps = {
  product?: WishlistProduct;
  wishlistId?: string;
};

const MenuProvider = ({
  children,
  product,
  wishlistId,
}: MenuProviderProps & { children: ReactNode }) => {
  return (
    <MenuContext.Provider
      value={{
        product,
        wishlistId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useProductMenu = () => {
  return useContext(MenuContext);
};

export default MenuProvider;
