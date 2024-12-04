import { type ReactNode } from "react";
import Link from "../ui/link";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

type NavLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  Icon?: LucideIcon;
};

const NavLink = ({ children, Icon, href, className }: NavLinkProps) => {
  return (
    <Link
      className={cn(
        "group flex w-full items-center gap-2 rounded-md px-2 py-1 text-xl font-medium transition-colors hover:bg-blue-200  ",
        className,
      )}
      href={href}
    >
      {Icon && <Icon className="group-hover:animate-shake " size={20} />}
      {children}
    </Link>
  );
};

export default NavLink;
