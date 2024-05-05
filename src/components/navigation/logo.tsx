import { Scroll } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import { cn } from "~/lib/utils";
import LogoIcon from "./logo-icon";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    // <Image
    //   src={"/fillaneed-logo-1.png"}
    //   alt="Fillaneed"
    //   height={80}
    //   width={140}
    // />
    <div className={cn("relative flex items-center gap-4 pt-4", className)}>
      <p className="mt-2 font-serif text-5xl tracking-tight  lg:text-4xl">
        fillaneed
      </p>

      <LogoIcon />
    </div>
  );
};

export default Logo;
