import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TitleBarProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const TitleBar = ({ children, className, wrapperClassName }: TitleBarProps) => {
  return (
    <div className="sticky top-0 z-10 mx-auto -mt-1 w-full bg-background pt-2 md:relative md:top-0">
      <div
        className={cn("translate-y-1 bg-none px-2 md:px-6", wrapperClassName)}
      >
        <div
          className={cn(
            " flex min-h-16 items-center justify-between overflow-hidden rounded-md border-2 border-black bg-background px-2 shadow-sm",
            className,
          )}
        >
          {children}
        </div>
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
        "-mb-1 font-serif text-xl font-medium md:text-2xl",
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
