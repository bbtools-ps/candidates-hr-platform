import type { ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { useSidebarContext } from "../hooks";

interface SidebarTriggerProps {
  children: React.ReactNode;
}

export default function SidebarTrigger({ children }: SidebarTriggerProps) {
  const { setIsOpen } = useSidebarContext();

  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!isValidElement(children)) return null;

  return cloneElement(children as ReactElement, {
    ...children.props,
    onClick: () => {
      toggleIsOpen();

      if (children.props.onClick) {
        children.props.onClick();
      }
    },
  });
}
