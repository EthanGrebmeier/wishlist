import React from "react";
import { Tooltip } from "./tooltip";
import { Button, type ButtonProps } from "./button";
import { cn } from "~/lib/utils";

type InputButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  button: ButtonProps & {
    tooltip?: string;
  };
};

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>(
  ({ className, button, ...props }, ref) => {
    const {
      tooltip,
      className: buttonClassName,
      variant: buttonVariant,
      ...buttonProps
    } = button;

    return (
      <div
        className={cn(
          "flex h-full w-full overflow-ellipsis rounded-l-md rounded-r-lg border border-black  focus-within:ring-2 focus-within:ring-ring",
          className,
        )}
      >
        <input
          ref={ref}
          className="flex-1 overflow-ellipsis rounded-md rounded-r-none bg-transparent p-2  pr-4 focus-visible:outline-none"
          type="text"
          {...props}
        />
        <Tooltip text={tooltip}>
          <Button
            className={cn("-translate-x-1 self-center ", buttonClassName)}
            variant={buttonVariant}
            type="button"
            {...buttonProps}
          />
        </Tooltip>
      </div>
    );
  },
);

InputButton.displayName = "InputButton";

export default InputButton;
