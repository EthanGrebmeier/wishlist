import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TitleBarProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const TitleBar = ({ children, className, wrapperClassName }: TitleBarProps) => {
  return (
    <div className="sticky top-0 z-10 mx-auto -mt-2 mb-2 w-full bg-background">
      <div className={cn("translate-y-2 bg-none", wrapperClassName)}>
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
        "translate-y-[2px] font-serif text-2xl font-medium",
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
