import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type ProductInputFrame = "form" | "autofill" | "image";

type ProductSheetNavigationContextType = {
  frame: ProductInputFrame;
  setFrame: Dispatch<SetStateAction<ProductInputFrame>>;
};

const ProductSheetNavigationContext =
  createContext<ProductSheetNavigationContextType | null>(null);

type ProductSheetNavigationProviderProps = {
  children: React.ReactNode;
};

export const ProductSheetNavigationProvider = ({
  children,
}: ProductSheetNavigationProviderProps) => {
  const [frame, setFrame] = useState<ProductInputFrame>("form");
  return (
    <ProductSheetNavigationContext.Provider value={{ frame, setFrame }}>
      {children}
    </ProductSheetNavigationContext.Provider>
  );
};

export const useProductSheetNavigation = () => {
  const context = useContext(ProductSheetNavigationContext);
  if (!context) {
    throw new Error(
      "useProductSheetNavigation must be used within a ProductSheetNavigationProvider",
    );
  }
  return context;
};
