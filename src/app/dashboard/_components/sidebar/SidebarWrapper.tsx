"use client";
import useSideBar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: IProps) => {
  const isCollapsed = useSideBar((state) => state.isCollapsed);
  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-[70px] lg:w-60 border-r lg:px-2 py-2 shadow-lg",
        isCollapsed && "lg:w-[70px] lg:p-0"
      )}
    >
      {children}
    </aside>
  );
};

export default SidebarWrapper;
