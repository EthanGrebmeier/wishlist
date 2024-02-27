import { type ReactNode } from "react";
import Link from "../ui/link";
import { cn } from "~/lib/utils";
import { LucideIcon } from "lucide-react";

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
        "group flex h-10 w-full items-center justify-between gap-2 rounded-md border-2 border-transparent px-4 transition-colors hover:bg-green-200 data-[selected=active]:border-black data-[selected=active]:bg-yellow-300",
        className,
      )}
      href={href}
    >
      {children}
      {Icon && <Icon className="group-hover:animate-shake " size={20} />}
    </Link>
  );
};

export default NavLink;
