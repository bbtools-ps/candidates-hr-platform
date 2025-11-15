/* eslint-disable react-hooks/refs */
import type { ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { useSidebarContext } from "../hooks";

interface SidebarTriggerProps {
  children: React.ReactNode;
}

export default function SidebarTrigger({ children }: SidebarTriggerProps) {
  const { setIsOpen, triggerRef } = useSidebarContext();

  const toggleIsOpen = () => {
    if (triggerRef?.current !== undefined) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
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
