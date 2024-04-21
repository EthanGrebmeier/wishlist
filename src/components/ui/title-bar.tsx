import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TitleBarProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const TitleBar = ({ children, className, wrapperClassName }: TitleBarProps) => {
  return (
    <div className={cn("z-10 bg-none px-2 md:px-6", wrapperClassName)}>
      <div
        className={cn(
          " flex min-h-16 items-center justify-between overflow-hidden rounded-md border-2 border-black bg-background px-2 shadow-sm",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "-mb-1 font-serif text-2xl font-medium md:text-3xl",
        className,
      )}
    >
      {" "}
      {children}{" "}
    </h1>
  );
};

Title.displayName = "Title";

TitleBar.Title = Title;

export default TitleBar;
