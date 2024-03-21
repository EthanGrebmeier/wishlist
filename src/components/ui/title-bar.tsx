import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TitleBarProps = {
  children?: ReactNode;
};

const TitleBar = ({ children }: TitleBarProps) => {
  return (
    <div className="mx-6 flex items-center justify-between border-gray-200 pb-4 lg:mb-8 lg:border-b">
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
    <h1 className={cn("py-1 font-serif text-3xl font-medium", className)}>
      {" "}
      {children}{" "}
    </h1>
  );
};

Title.displayName = "Title";

TitleBar.Title = Title;

export default TitleBar;
