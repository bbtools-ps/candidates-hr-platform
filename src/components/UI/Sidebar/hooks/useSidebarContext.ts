import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface SidebarContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef?: React.MutableRefObject<HTMLElement | null>;
}

export const SidebarContext = createContext<SidebarContext | undefined>(
  undefined
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within a Sidebar");
  }
  return context;
};
