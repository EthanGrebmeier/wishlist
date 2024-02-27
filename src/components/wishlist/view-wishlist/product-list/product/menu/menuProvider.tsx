"use client";

import { createContext, useContext } from "react";

const MenuContext = createContext({
  productId: "",
  wishlistId: "",
});

type MenuProviderProps = {
  children: JSX.Element;
  productId: string;
  wishlistId: string;
};

const MenuProvider = ({
  children,
  productId,
  wishlistId,
}: MenuProviderProps) => {
  return (
    <MenuContext.Provider
      value={{
        productId,
        wishlistId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};

export default MenuProvider;
