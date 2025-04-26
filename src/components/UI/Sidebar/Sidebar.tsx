import { useState } from "react";
import SidebarContent from "./components/SidebarContent";
import SidebarTrigger from "./components/SidebarTrigger";
import { SidebarContext } from "./hooks";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

Sidebar.Content = SidebarContent;
Sidebar.Trigger = SidebarTrigger;
