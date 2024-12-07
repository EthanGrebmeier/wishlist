"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ContextBarButton = {
  shouldShow: boolean;
  backgroundColor: string;
  icon: ReactNode;
  text: string;
  hideTextOnMobile?: boolean;
  onClick: () => void | Promise<void>;
};

type ContextBarContextType = {
  buttons: ContextBarButton[];
  setButtons: (buttons: ContextBarButton[]) => void;
};

const ContextBarContext = createContext<ContextBarContextType | null>(null);

export const useContextBar = () => {
  const context = useContext(ContextBarContext);
  if (!context) {
    throw new Error("useContextBar must be used within a ContextBarProvider");
  }
  return context;
};

type ContextBarProviderProps = {
  children: ReactNode;
};

export const ContextBarProvider = ({ children }: ContextBarProviderProps) => {
  const [buttons, setButtons] = useState<ContextBarButton[]>([]);
  return (
    <ContextBarContext.Provider value={{ buttons, setButtons }}>
      {children}
    </ContextBarContext.Provider>
  );
};
