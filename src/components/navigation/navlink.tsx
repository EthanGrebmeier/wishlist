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
        "group flex h-8 w-full items-center gap-2 rounded-md px-2 text-xl transition-colors hover:bg-blue-200  data-[selected=active]:bg-green-200",
        className,
      )}
      href={href}
      shallowSelected={shallowSelected}
    >
      {Icon && <Icon className="group-hover:animate-shake " size={20} />}
      {children}
    </Link>
  );
};

export default NavLink;
