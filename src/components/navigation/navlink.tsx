import { type ReactNode } from "react";
import Link from "../ui/link";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

type NavLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  Icon?: LucideIcon;
  shallowSelected?: boolean;
};

const NavLink = ({
  children,
  Icon,
  href,
  shallowSelected,
  className,
}: NavLinkProps) => {
  return (
    <Link
      className={cn(
        "group flex h-10 w-full items-center justify-between gap-2 rounded-md border-2 border-transparent px-4 transition-colors hover:bg-blue-200 data-[selected=active]:border-black data-[selected=active]:bg-green-200",
        className,
      )}
      href={href}
      shallowSelected={shallowSelected}
    >
      {children}
      {Icon && <Icon className="group-hover:animate-shake " size={20} />}
    </Link>
  );
};

export default NavLink;
