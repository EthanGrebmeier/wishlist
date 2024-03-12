import { type ReactNode } from "react";
import Link from "../ui/link";

type NavLinkProps = {
  children: ReactNode;
  href: string;
};

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Link
      className="w-full rounded-md px-4 py-2 transition-colors hover:bg-slate-100 data-[selected=active]:bg-slate-200"
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
