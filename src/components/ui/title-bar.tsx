import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TitleBarProps = {
  children?: ReactNode;
  className?: string;
};

const TitleBar = ({ children, className }: TitleBarProps) => {
  return (
    <div
      className={cn(
        "z-10 flex items-center justify-between border-gray-200 bg-background px-6 pb-4 md:h-16 lg:border-b",
        className,
      )}
    >
      {children}
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
        "py-1 font-serif text-2xl font-medium md:text-3xl",
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
