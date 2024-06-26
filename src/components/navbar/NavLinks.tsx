"use client";

import { navLinksArr } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-2">
      {navLinksArr.map((link, i) => (
        <li
          key={i}
          className={cn(
            "pb-2 px-2 transition navLink",
            pathname === link.path &&
              "text-orange-600 border-b border-orange-600 "
          )}
        >
          <Link href={`${link.path}`}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
