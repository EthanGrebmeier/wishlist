import { cn } from "~/lib/utils";
import LogoIcon from "./logo-icon";

type LogoProps = {
  className?: string;
  textClassName?: string;
  size?: "base" | "large";
  ariaHidden?: boolean;
};

const Logo = ({
  className,
  textClassName,
  size,
  ariaHidden = false,
}: LogoProps) => {
  return (
    <div className={cn("relative flex items-center gap-4", className)}>
      <p
        className={cn(
          "font-serif  tracking-tight ",
          size === "large" ? "text-5xl md:text-7xl" : "text-5xl lg:text-4xl",
          textClassName,
        )}
        aria-hidden={ariaHidden}
      >
        fillaneed
      </p>

      <LogoIcon size={size} />
    </div>
  );
};

export default Logo;
