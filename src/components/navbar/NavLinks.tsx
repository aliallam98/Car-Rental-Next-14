"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Category",
    path: "/category",
  },
  {
    label: "Brand",
    path: "/brand",
  },
  {
    label: "car",
    path: "/car",
  },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-2">
      {navLinks.map((link, i) => (
        <li
          key={i}
          className={cn("text-lg", pathname === link.path && "text-orange-600")}
        >
          <Link href={`${link.path}`}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
