"use client"
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { adminDashboardLinks } from "@/constants";


const Navigation = () => {
  const pathname = usePathname();

  // if (!user?.username) {
  //   return (
  //     <ul className="space-y-2 px-2 pt-6 lg:pt-2">
  //       {[...Array(4)].map((_, i) => (
  //         <NavItem.Skeleton key={i} />
  //       ))}
  //     </ul>
  //   );
  // }
  
  return (
    <ul className="space-y-2 px-2 pt-6 lg:pt-2">
      {adminDashboardLinks.map((link) => (
        <NavItem
          key={link.path}
          icon={link.icon}
          label={link.label}
          path={link.path}
          isActive={pathname === link.path}
        />
      ))}
    </ul>
  );
};

export default Navigation;
